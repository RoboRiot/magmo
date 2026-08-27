// components/LoadingButton.js
import React, { useEffect, useState } from "react";
import Link from "next/link";

const simulateNetworkRequest = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

const LoadingButton = ({ type, name, route }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => setLoading(false));
    }
  }, [isLoading]);

  return (
    <Link
      href={`/${route}`}
      className={`btn btn-${type}`}
      disabled={isLoading}
      onClick={() => !isLoading && setLoading(true)}>

      {isLoading ? "Loading…" : name}

    </Link>
  );
};

export default LoadingButton;
