import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

const MainLayout = () => {
  const [pwd, setPwd] = useState("safePassword");
  const [pwdList, setPwdList] = useState([]);
  const [pwdLength, setPwdLength] = useState(8);
  const [isCheckedLow, setIsCheckedLow] = useState(true);
  const [isCheckedUp, setIsCheckedUp] = useState(false);
  const [isCheckedNum, setIsCheckedNum] = useState(false);
  const [isCheckedSpecial, setIsCheckedSpecial] = useState(false);

  const specialCharacter = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "_",
    "+",
    "-",
    "=",
    ".",
    "/",
    "?",
  ];

  const numbers = [0, 1, 2, 3, 4, 5, 7, 8, 9];

  const uppercaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const lowercaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const newPwd = [];

  const handleGenerateBtn = () => {
    let newPassword = "";
    for (let i = 0; i < pwdLength; i++) {
      newPassword += pwdList[Math.floor(Math.random() * pwdList.length)];
    }

    setPwd(newPassword);
  };

  useEffect(() => {
    const availableChars = {
      lowercase: lowercaseLetters,
      uppercase: uppercaseLetters,
      numbers: numbers,
      special: specialCharacter,
    };

    try {
      if (!isCheckedLow && !isCheckedUp && !isCheckedNum && !isCheckedSpecial) {
        throw new Error("Es muss mindestens eine Checkbox angewählt sein.");
      }

      const selectedChars = Object.keys(availableChars)
        .filter((key) => {
          const isChecked =
            (isCheckedLow && key === "lowercase") ||
            (isCheckedUp && key === "uppercase") ||
            (isCheckedNum && key === "numbers") ||
            (isCheckedSpecial && key === "special");
          return isChecked;
        })
        .map((key) => availableChars[key])
        .flat();

      setPwdList(selectedChars);
    } catch (e) {
      alert(e.message);
      setIsCheckedLow((isCheckedLow) => !isCheckedLow);
    }
  }, [isCheckedLow, isCheckedUp, isCheckedNum, isCheckedSpecial]);

  const handleCheckboxes = (event) => {
    const name = event.target.name;

    if (name === "low") {
      setIsCheckedLow((isCheckedLow) => !isCheckedLow);
    } else if (name === "up") {
      setIsCheckedUp((isCheckedUp) => !isCheckedUp);
    } else if (name === "num") {
      setIsCheckedNum((isCheckedNum) => !isCheckedNum);
    } else if (name === "special") {
      setIsCheckedSpecial((isCheckedSpecial) => !isCheckedSpecial);
    }
  };

  const handleNumberInput = (event) => {
    setPwdLength(event.target.value);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      {/* start generate section */}
      <div>
        <div className="d-flex justify-content-center flex-column">
          <h1 className="text-center">Password Generator</h1>
          <p className="text-center mt-3 col-md-6 mx-auto" id="password">
            {pwd}
          </p>
          <button
            className="btn btn-outline-light col-md-3 mx-auto"
            onClick={handleGenerateBtn}
          >
            Generate
          </button>
        </div>
        {/* end generate section */} {/* start settings section */}
        <div className="d-flex justify-content-center mt-5">
          <div className="d-flex justify-content-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="low"
                checked={isCheckedLow}
                onChange={handleCheckboxes}
              />
              <label className="form-check-label" htmlFor="low">
                Lowercase letters
              </label>
            </div>

            <div className="form-check form-check-inline ">
              <input
                className="form-check-input"
                type="checkbox"
                name="up"
                checked={isCheckedUp}
                onChange={handleCheckboxes}
              />
              <label className="form-check-label" htmlFor="up">
                Uppercase letters
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="num"
                checked={isCheckedNum}
                onChange={handleCheckboxes}
              />
              <label className="form-check-label" htmlFor="num">
                Numbers
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="special"
                checked={isCheckedSpecial}
                onChange={handleCheckboxes}
              />
              <label className="form-check-label" htmlFor="special">
                Special characters
              </label>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-auto">
              <label htmlFor="passwordLength" className="col-form-label">
                Password length:
              </label>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="number"
                id="passwordLength"
                value={pwdLength}
                min={8}
                max={20}
                onChange={handleNumberInput}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end settings section */}
    </div>
  );
};

export default MainLayout;
