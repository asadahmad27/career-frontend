import { useNavigate, useLocation } from "react-router-dom";
import { MyCareerGuidanceButton } from "../../commonComponents";
import "./YoutubePageStyle.css";

const YoutubePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, videoId } = location.state || {};

  return (
    <>
      <div className="youtubeContainerStyle">
        <div className="dashboardRightHeadingDiv">YouTube Video</div>
        <iframe
          width="90%"
          height="500"
          src={videoId}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <MyCareerGuidanceButton
          label="Continue Test"
          className="resultDataButton"
          type="button"
          htmlType="button"
          onClick={() =>
            navigate("/educational-guidance-test", {
              state: { data: data },
            })
          }
        />
      </div>
    </>
  );
};
export default YoutubePage;
