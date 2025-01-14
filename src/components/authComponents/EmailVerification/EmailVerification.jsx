import React, { useState } from "react";
import sideAuthImage from "../../../assets/sideAuthImage.png";
import myCareerGuidanceIcon from "../../../assets/my-guidance-logo.png";
import usernameIcon from "../../../assets/usernameIcon.svg";
import { API_URL } from "../../../utils/constants";
import { postApiWithoutAuth } from "../../../utils/api";
import { message, Image } from "antd";
import { MyCareerGuidanceButton } from "../../commonComponents";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./EmailVerificationStyle.css";
const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handlerSubmit = async () => {
    setLoading(true);
    const response = await postApiWithoutAuth(API_URL.OTPCONFIRM, {
      email: data.email,
      otp: otp,
    });
    if (response.status === 200) {
      setLoading(false);
      message.success("Code Verify Successfull");
      navigate("/new-password", { state: { data } });
    } else {
      setLoading(false);
      message.error(response.data.message[0]);
    }
  };

  return (
    <div className="mainDiv">
      <div className="leftDiv">
        <Image preview={false} src={myCareerGuidanceIcon} width={207} />
        <div className="emailVerificationStyleLeft">
          <div className="emailVerificationStyleLeftInner">
            <div className="welcomeHaddingText">Email Verification</div>
            <div className="textStyle18" style={{ marginBottom: 10 }}>
              Please enter the 4-digit verification code that was sent to your
              email
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className="boxesPadding"></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  height: 50,
                  width: 54,
                  borderRadius: 10,
                  background: "rgba(218, 218, 218, 0.56)",
                }}
              />
            </div>
            <MyCareerGuidanceButton
              label="Continue"
              className="signInButton"
              type="primary"
              htmlType="submit"
              loading={loading}
              backgroundColor="#0575E6"
              disabled={otp?.length < 4}
              onClick={() => {
                handlerSubmit();
              }}
            />
          </div>
        </div>
        <span className="allRights">
          © 2023 My Guidance. All Rights Reserved
        </span>
      </div>
      <div className="mobileScreenImage">
        <Image
          preview={false}
          src={sideAuthImage}
          width={"100%"}
          height="100%"
        />
      </div>
    </div>
  );
};
export default EmailVerification;
