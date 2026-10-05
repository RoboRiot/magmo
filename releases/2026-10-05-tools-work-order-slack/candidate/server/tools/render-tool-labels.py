"""Render synthetic tool labels only; never touches live records or printers."""
import io
import json
import sys
import time
from pathlib import Path
import requests
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scanner-server"))
from warehouse_scanner.tool_label_print import build_tool_label

output = Path(__file__).resolve().parent / "tool-label-render"
output.mkdir(parents=True, exist_ok=True)
base = {"template":"tool-v1", "label_type":"tool", "tool_id":"AIS_T00047", "name":"Digital Multimeter Kit", "description":"Meter, test leads and carrying case. Return all pieces after use.", "oem":"Fluke", "model":"87V", "modality":"Service", "barcode_value":"AIS_T00047", "barcode_format":"CODE128", "qr_value":"https://magmo.cloud/NewSearch/Tools/AIS_T00047"}
cases = [
    ("normal", base),
    ("minimal", {**base, "name":"Torque Wrench", "description":"", "oem":"", "model":"", "modality":""}),
    ("long", {**base,"name":("Specialized Calibration and Diagnostic Alignment Toolkit for Field Service Maintenance of Imaging Systems "*2)[:160], "description":("Includes precision accessories and adapters. Check the tool page for the complete instructions and kit contents. "*7)[:600], "oem":"Example manufacturer's longest supported equipment vendor name "*1, "model":"Imaging Diagnostic Multisystem Precision Calibration Accessory Kit Revision 2026", "modality":"CT, MRI, PET/CT, Ultrasound and Field Service"}),
    ("unbroken", {**base,"name":"X"*160,"description":"Characters ^XZ and ~JA remain text, not printer commands.","oem":"A"*100,"model":"B"*100,"modality":"C"*100}),
]
images=[]
reports=[]
for slug,payload in cases:
    zpl=build_tool_label(payload)
    response=requests.post("https://api.labelary.com/v1/printers/8dpmm/labels/4.04x5.81/0/",data=zpl.encode(),headers={"Accept":"image/png"},timeout=30)
    response.raise_for_status()
    image=Image.open(io.BytesIO(response.content)).convert("RGB")
    image.save(output/f"{slug}.png")
    (output/f"{slug}.zpl").write_text(zpl,encoding="utf-8")
    qr=image.convert("L").crop((550,920,805,1120)).point(lambda p: 255 if p<128 else 0).getbbox()
    reports.append({"case":slug,"size":image.size,"qrBlackBounds":[qr[0]+550,qr[1]+920,qr[2]+550,qr[3]+920] if qr else None})
    images.append((slug,image))
    time.sleep(1)
montage=Image.new("RGB",(images[0][1].width*2,(images[0][1].height+40)*2),"#dce3ea")
draw=ImageDraw.Draw(montage)
for i,(slug,image) in enumerate(images):
    x=(i%2)*image.width; y=(i//2)*(image.height+40)
    draw.text((x+15,y+10),slug,fill="black")
    montage.paste(image,(x,y+40))
montage.save(output/"montage.png")
(output/"report.json").write_text(json.dumps(reports,indent=2))
print(json.dumps({"output":str(output),"cases":reports}))
