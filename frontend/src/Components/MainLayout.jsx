import { useEffect, useState } from "react";

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
    <div>
      <h1>Generate Password</h1>
      <p id="password">{pwd}</p>
      <button onClick={handleGenerateBtn}>Generate</button>
      <input
        type="checkbox"
        name="low"
        checked={isCheckedLow}
        onChange={handleCheckboxes}
      />
      <label>Klein</label>
      <input
        type="checkbox"
        name="up"
        checked={isCheckedUp}
        onChange={handleCheckboxes}
      />
      <label>Groß</label>
      <input
        type="number"
        value={pwdLength}
        min={8}
        max={20}
        onChange={handleNumberInput}
      />
      <input
        type="checkbox"
        name="num"
        checked={isCheckedNum}
        onChange={handleCheckboxes}
      />
      <label>Zahlen</label>
      <input
        type="checkbox"
        name="special"
        isChecked={isCheckedSpecial}
        onChange={handleCheckboxes}
      />
      <label>Sonderzeichen</label>
    </div>
  );
};

export default MainLayout;
