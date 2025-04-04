
import React from "react";
import PendingImg from "./Img/pending-banner.svg";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const PendingAproval = ({ flash, setFlash }) => {
    return (
        <div className="Arrri-Pahgs">
            <div className="large-container">
                <div className="Arrri-Pahgs-main Succ-Sec">
                    <div className="Succ-Box">
                        {flash && (
                            <FlashMessage
                                message={flash.message}
                                type={flash.type}
                                onClose={() => setFlash(null)}
                            />
                        )}

                        <img src={PendingImg} alt="Pending" />
                        <h3>Profile pending</h3>
                        <h6>Verification ongoing (This will be for 24 hours)</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingAproval;
