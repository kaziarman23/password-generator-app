import { useCallback, useEffect, useRef, useState } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numberAllow, setNumberAllow] = useState(0);
    const [charAllow, setCharAllow] = useState(0);
    const [password, setPassword] = useState("");

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllow) str += "0123456789";
        if (charAllow) str += "!@#$%^&*()_+{}[]:;?<>.,";

        for (let i = 0; i < length; i++) {
            const char = Math.ceil(Math.random() * str.length);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numberAllow, charAllow, setPassword]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllow, charAllow, passwordGenerator]);

    const passwordRef = useRef(null);

    const copyToClipBoard = useCallback(()=>{
      window.navigator.clipboard.writeText(password)
      passwordRef.current?.select()
    },[password])
    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-black">
                <div className="max-w-2/5  h-40 bg-gray-700 rounded-md ">
                    <h1 className="text-white text-center p-2">
                        Password Generator
                    </h1>
                    <div className="w-4/5 h-10 m-auto flex">
                        <input
                            type="text"
                            readOnly
                            value={password}
                            className="w-4/5 h-auto outline-none  text-orange-500"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                        <button onClick={copyToClipBoard} className="bg-blue-600 cursor-pointer p-2 hover:bg-blue-700">
                            COPY
                        </button>
                    </div>
                    <div className="flex w-full h-auto justify-center items-center gap-2 mt-5 text-orange-500 p-5">
                        <input
                            type="range"
                            min={6}
                            max={120}
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                            className="cursor-pointer"
                        />
                        <label>length: {length}</label>
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="cursor-pointer"
                            defaultChecked={numberAllow}
                            onChange={() => {
                                setNumberAllow((prev) => !prev);
                            }}
                        />
                        <label htmlFor="checkbox">Number</label>
                        <input
                            type="checkbox"
                            id="charCheckbox"
                            className="cursor-pointer"
                            defaultChecked={charAllow}
                            onChange={() => {
                                setCharAllow((prev) => !prev);
                            }}
                        />
                        <label htmlFor="charCheckbox">Character</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
