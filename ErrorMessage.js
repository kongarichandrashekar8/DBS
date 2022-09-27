import CancelIcon from "@mui/icons-material/Cancel";
import "./style.css";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

function ErrorMessage() {
  const navigation = useNavigate();
  const params = useParams();

  function goToTransaction() {
    navigation("/");
  }
  return (
    <>
      <div className="final-card">
        <CancelIcon
          fontSize="inherit"
          style={{ fontSize: "90px", color: "red", paddingLeft: "195px" }}
        />

        <p>Transaction Unsuccessful due to {params.eid}</p>
        <br></br>
        <Button variant="contained" type="submit" onClick={goToTransaction}>
          Back
        </Button>
      </div>
    </>
  );
}
export default ErrorMessage;
