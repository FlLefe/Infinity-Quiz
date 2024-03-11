import { ThreeCircles } from "react-loader-spinner";
import "./LoadingSpinner.scss";
import { useEffect, useState } from "react";
export default function LoadingSpinner() {

  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showSpinner) {
    return null;
  }
  return (
    <div className='spinnerDisplay'>   
      <ThreeCircles
      visible={true}
      height="200"
      width="200"
      color="#F0932B"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
    </div>
  );
}
