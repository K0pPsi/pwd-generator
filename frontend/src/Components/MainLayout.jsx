import { useEffect, useState } from "react";

const MainLayout = () => {
  const [pwd, setPwd] = useState("safePassword");
  const [pwdList, setPwdList] = useState([]);
  const [isCheckedLow, setIsCheckedLow] = useState(true);
  const [isCheckedUp, setIsCheckedUp] = useState(false);

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
    for (let i = 0; i < 8; i++) {
      newPassword += pwdList[Math.floor(Math.random() * pwdList.length)];
    }

    setPwd(newPassword);
  };

  useEffect(() => {
    if (isCheckedLow && isCheckedUp) {
      setPwdList(lowercaseLetters.concat(uppercaseLetters));
    } else if (isCheckedLow) {
      setPwdList(lowercaseLetters);
    } else if (isCheckedUp) {
      setPwdList(uppercaseLetters);
    }
  }, [isCheckedLow, isCheckedUp]);

  const handleCheckboxes = (event) => {
    const name = event.target.name;

    if (name === "low") {
      setIsCheckedLow((isCheckedLow) => !isCheckedLow);
    } else if (name === "up") {
      setIsCheckedUp((isCheckedUp) => !isCheckedUp);
    }
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
    </div>
  );
};

export default MainLayout;
