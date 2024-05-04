import { useCallback, useState } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numberAllow, setNumberAllow] = useState("false");
    const [charAllow, setCharAllow] = useState("false");
    const [password, setPassword] = useState("");

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllow) str += "0123456789";
        if (charAllow) str += "!@#$%^&*()_+{}[]:;?<>.,";

        for (let i = 0; i < length; i++) {
            const char = Math.ceil(Math.random() * str.length);
            pass = str.charAt(char);
        }

        setPassword(pass)

    }, [length, numberAllow, charAllow, setPassword]);

    return <>
    <div className="flex justify-center items-center w-full h-screen bg-black">
      <div className="w-96 max-w-96 h-40 bg-gray-700 rounded-md ">
        <h1 className="text-white text-center p-2">Password Generator</h1>
        <div className="w-4/5 h-10 m-auto flex">
          <input type="text" readOnly className="w-4/5 h-auto outline-none" placeholder="Password" />
          <button className="bg-blue-600 cursor-pointer p-2 hover:bg-blue-700">COPY</button>
        </div>
        <div className="flex w-full h-auto justify-center items-center gap-2 mt-5 text-orange-500">
          <input type="range" value={length} className="cursor-pointer" />
          <label>length:{length}</label>
          <input type="checkbox" id="checkbox" className="cursor-pointer"/>
          <label htmlFor="checkbox">Number</label>
          <input type="checkbox" id="charCheckbox" className="cursor-pointer"/>
          <label htmlFor="charCheckbox">Character</label>
        </div>
      </div>
    </div>
    </>;
}

export default App;
