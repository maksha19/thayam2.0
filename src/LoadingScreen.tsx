import React, { useState } from "react";
import "./LoadingScreen.css";

const tamilRules = [
  {
    title: "தாயத்தில் உள் நுழைவதற்கான விதிகள்:",
    points: [
      "பகடை உருட்டும் பொழுது எண் ஒன்று அல்லது 5 இட்டு காய்களை துவைய வேண்டும்.",
      "முதலாவது காயினை எண் 1 (தாயம்) இட்டு தான் துவைய வேண்டும்.",
    ],
  },
  {
    title: "தாயத்தின் மற்ற விதிமுறைகள்:",
    points: [
      "ஆட்டகாரர்கள் துவக்க கட்டத்தில் இருந்து கடிகாரம் சுற்றும் திசைக்கு எதிர் திசையில் உங்களுடைய காய்களை நகர்த்த வேண்டும் அல்லது உங்களது வலப்புறமாக காய்களை நகர்த்த வேண்டும்.",
      "பகடை உருட்டும் போது 1,5,6, 12 இந்த எண்கள் விழுந்தால் உங்கள் ஆட்டத்தை மீண்டும் தொடரலாம், இவ்வாறு தொடரும் பொழுது ஒரே எண் 3 முறை விழுந்தாள் அந்த ஆட்டம் கணக்கிலெடுத்துக் கொள்ளபடாது ஆட்டகாரர்கள் காயினை நகர்த்த முடியாது.",
      "எண்கள் 2,3,4 விழுந்தால் மறுஆட்டம் கிடையாது.",
      "இறுதி கட்டத்தில் காயினை சேர்க்கும் போது, பகடை உருட்டும் போது விழுந்த எண்களை பழம் பழுக்க தேவையான எண்களை விட அதிகம் எனில் காயின் நகர்த்த முடியாது.",
    ],
  },
  {
    title: "தாயத்தின் வெட்டு விதிமுறைகள்:",
    points: [
      "ஆட்டத்தின் போது எந்தவொரு கட்டத்திலும் ஒரு ஆட்டகாரரின் காய்கள் மட்டுமே இருக்க வேண்டும். ஒரு வேளை  அவ்வாறு நேர்ந்தால் , முதல் இருந்தகாய் வெட்டபட்டு கட்டத்திலிருந்து நீக்கப்படும்.",
      "எதிர் ஆட்டகாரரின் காயினை வெட்டி இருந்தால் மட்டுமே தாயகட்டத்தின் இரண்டாம் அடுக்கு கட்டங்களுக்குள் செல்ல முடியும்.",
      "விதி விலக்கு : குறுக்கு கோடிட்ட கட்டங்களில் காய்களை வெட்ட முடியாது.",
    ],
  },
  {
    title: "தாயத்தில் வெற்றி பெறுவதற்கான விதிகள்:",
    points: [
      "முதலாவதாக அனைத்து காய்களையும் இறுதி கட்டம் வரை (பழம்)எடுத்து செல்பவர் வெற்றியாளராக கருதப்படுவார்.",
    ],
  },
];

const engRules = [
  {
    title: "Game starting rules:",
    points: [
      "At the commencement of the game, players are eligible to initiate their moves from their respective home cross-boxes upon rolling a dice and obtaining the number(1).",
    ],
  },
  {
    title: "Playing rules:",
    points: [
      "The game progresses in an anti-clockwise direction or in the player's right-hand direction from their home cross-box.",
      "Rolls of the dice resulting in 1, 5, 6, or 12 permit the player to take the next turn. If a player rolls the same number three times consecutively, the entire turn becomes invalid, and no movement is permitted.",
      "Dice faces 2, 3, and 4 do not trigger an additional dice roll.",
      "Precision in dice rolls is crucial, especially when moving a coin into the center cross-box.",
    ],
  },
  {
    title: "Coin capture rules :",
    points: [
      "Players can seize an opponent's coin solely within the playing-box.",
      "Coin capture is not allowed within the cross-box.",
      "A player must successfully capture at least one opponent's coin to advance their own coin to the inner level; otherwise, their coin must remain positioned behind in their home cross-box.",
    ],
  },
  {
    title: "Wining rules:",
    points: [
      "The player who successfully places all their coins into the center cross-box first is declared the winner of the game.",
    ],
  },
];

const LoadingScreen = ({ startGame }: { startGame: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTamil, setIsTamil] = useState<boolean>(true);
  const [gameRules, setGameRules] = useState(tamilRules)

  const checkOrientation = () => {
    if (window.matchMedia("(orientation: landscape)").matches) {
      startGame();
    } else {
      setIsLoading(false);
    }
  };

  const changeRuleLan = () => {
    if (isTamil) {
      setIsTamil(false);
      setGameRules(engRules)
    } else {
      setIsTamil(true)
      setGameRules(tamilRules)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="h-full min-h-full grid grid-cols-12 xl:mx-auto xl:w-1120 items-center justify-center">
          <div className="grid col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 text-white text-xl bg-gray-700 opacity-75 overflow-auto font-semibold">
            <div className="flex justify-end p-4 space-x-2">
              <p>English</p>
              <div className={`h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out'
                ${isTamil ? 'bg-indigo-600 ring-black/20' : 'bg-slate-900/10 ring-slate-900/5'}`}
                onClick={() => changeRuleLan()}>
                <div className={`'h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out',
                  ${isTamil ? 'translate-x-4' : ''}`} />
              </div>
              <p>தமிழ்</p>
            </div>
            {gameRules.map((rule) => (
              <div className="mr-3 ml-3 mt-1">
                <h1 className="text-center text-xl mb-1 underline underline-offset-4">{rule.title}</h1>
                <ol className="list-inside list-decimal">
                  {rule.points.map((point: string) => (
                    <li style={{ fontSize: '14px' }} className="leading-loose">{point}</li>
                  ))}
                </ol>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                className="bg-blue-700 text-white font-bold w-auto py-2 px-4 m-4 rounded"
                onClick={() => checkOrientation()}
              >
                {isTamil ? "விளையாட்டை தொடங்க" : "Start Game"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white  font-semibold">
              This page is best viewed in landscape mode
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default LoadingScreen;
