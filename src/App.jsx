import { useState,useEffect } from 'react'
import Settings from './components/Settings'
import Keys from './components/Keys'
import './styles.css'
export default function App() {
  const [currentInstrument, setCurrentInstrument] = useState('piano')
  const [playbackRate, setPlaybackRate] = useState(10)
  const [volume, setVolume] = useState(50)
  const [loop, setLoop] = useState(false)
  const [loopingNotes, setLoopingNotes] = useState([])
  const [showKeys, setShowKeys] = useState({
    musicKeys: false,
    computerKeys: false,
    noKeys: true,
  })

  const [synthKeys, setSynthKeys] = useState([
    {
      keyName: 'c2',
      displayName: 'c2',
      computerKey: 'a',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'c-sharp',
      displayName: 'c#',
      computerKey: 'w',
      color: 'black',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'd',
      displayName: 'd',
      computerKey: 's',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'd-sharp',
      displayName: 'd#',
      computerKey: 'e',
      color: 'black',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'e',
      displayName: 'e',
      computerKey: 'd',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'f',
      displayName: 'f',
      computerKey: 'f',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'f-sharp',
      displayName: 'f#',
      computerKey: 't',
      color: 'black',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'g',
      displayName: 'g',
      computerKey: 'g',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'g-sharp',
      displayName: 'g#',
      computerKey: 'y',
      color: 'black',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'a',
      displayName: 'a',
      computerKey: 'h',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'a-sharp',
      displayName: 'a#',
      computerKey: 'u',
      color: 'black',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'b',
      displayName: 'b',
      computerKey: 'j',
      color: 'white',
      active: false,
      keyPressed: false,
    },

    {
      keyName: 'c3',
      displayName: 'c3',
      computerKey: 'k',
      color: 'white',
      active: false,
      keyPressed: false,
    },
  ])

  const activeKey = synthKeys.find((key) => key.active)

  if (activeKey) {
    playNote(`./sounds/${currentInstrument}/${activeKey.keyName}.mp3`)
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key === activeKey ? { ...key, active: false } : key
      )
    )
  }

  function playNote(note) {
    let audio = new Audio(note)
    audio.volume = volume / 100
    audio.playbackRate =
      playbackRate <= 10 ? playbackRate / 10 : playbackRate - 9
    audio.loop = loop
    audio.play()
    loop && setLoopingNotes([...loopingNotes, audio])
  }

  const propsBundle = {
    currentInstrument,
    setCurrentInstrument,
    playbackRate,
    setPlaybackRate,
    volume,
    setVolume,
    loop,
    setLoop,
    loopingNotes,
    setLoopingNotes,
    showKeys,
    setShowKeys,
  }

  /* Challenge

	Bu synth klavyede önemli bir şey henüz çalışmıyor: Tuşlar. Göreviniz, kullanıcının tuşları mouse tuşu ya da bilgisayar klavyesi ile aşağıdaki şekilde oynatmasına izin vermektir:  
	
		1. Bir kullanıcı mouse tuşu veya bilgisayar tuşu ile bir synth tuşu çaldığında, synthKeys state array içinde synth tuşunun ilgili nesnesinin active özelliği true olarak ayarlanmalıdır. 
		   
				   - Bir synth tuşunun mouse tuşu ile çalınması, synth tuşu üzerinde mouse tuşunun basılı tutulması (*tıklanmaması*) anlamına gelir. 
					 
				   - Bir synth tuşunu bir bilgisayar tuşuyla çalmak, synthKeys state dizisindeki synth tuşunun karşılık gelen computerKey özelliği tarafından tanımlandığı gibi, ona karşılık gelen bilgisayar tuşuna basmak anlamına gelir. 
				
		2. Kullanıcı bir bilgisayar tuşuna basarak bir synth tuşunu çalarsa, synth tuşunun synthKeys state array'deki karşılık gelen nesnesinin keyPressed özelliği de true olarak ayarlanmalıdır. Kullanıcı bilgisayar tuşunu kaldırdığında, keyPressed özelliği tekrar false olarak ayarlanmalıdır. 
		   
		3. Nesnenin diğer tüm özellikleri ve synthKeys state array'deki diğer tüm nesneler, state her güncellendiğinde korunmalıdır. Yalnızca hedeflenen nesnenin active özelliği ve (varsa) keyPressed özelliği değiştirilmelidir. 

		4. Görevi tamamlamak için yalnızca aşağıdaki üç olay işleyicisi için kod yazmalısınız. Projenin başka hiçbir yerinde başka bir kod değiştirilmemeli veya eklenmemelidir. Görevi bitirmeden önce key'lerde hata olup olmadığını da kontrol etmelisiniz. Bir kullanıcının onunla nasıl etkileşime gireceğini simüle etmek için üzerinde biraz müzik çalın. 
		   
		Not: QWERTY olmayan bir klavyeniz varsa, synthKey state dizisindeki computerKey özelliklerini klavye düzeniniz için daha anlamlı olan bilgisayar tuşlarıyla değiştirebilirsiniz

		İpucu: "main-container" div'ine onClick={(e)=>console.log(e.target)} ekleyin ve altta yatan DOM'u tanımak için tuşlara tıklayın ya da bileşenler klasöründeki Keys bileşenine bakın.  

				Saldırı Planı:
				
			2. Olayları yorumlayın
				- Ne tür bir olay? 
				- Olay synthkey state nesnelerinden birine karşılık geliyor mu? 
				- Eğer öyleyse, hangisi? (Buna hedef nesne deyin.)
				
			3. synthKeys state dizisini güncelleyin. 
				- Hedef nesneyi güncelleyin. 
					- mouseDown veya keyDown -> hedef nesnenin active özelliği = true 
					- keyDown -> ayrıca -> hedef nesnenin keyPressed özelliği = true 
					- keyUp -> hedef nesnenin keyPressed özelliği = false 

*/
// Kullanıcı bir bilgisayar tuşuna bastığında tetiklenecek olan fonksiyon
const handleKeyPress = (event) => {
  const clickedKeyName = event.target.getAttribute('data-key');
  const clickedKey = synthKeys.find((key) => key.keyName === clickedKeyName);
  if (clickedKey && !clickedKey.active) {
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key === clickedKey ? { ...key, active: true, keyPressed: true } : key
      )
    );
  }
};

// Kullanıcı bir tuşa basarak çaldığında tetiklenecek olan fonksiyon
const handleKeyDown = (event) => {
  const pressedKey = synthKeys.find((key) => key.computerKey === event.key.toLowerCase());
  if (pressedKey && !pressedKey.active) {
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key === pressedKey ? { ...key, active: true, keyPressed: true } : key
      )
    );
  }
};

// Kullanıcı bir tuşu bıraktığında tetiklenecek olan fonksiyon
const handleKeyRelease = (event) => {
  const releasedKey = synthKeys.find((key) => key.computerKey === event.key.toLowerCase());
  if (releasedKey && releasedKey.active) {
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key === releasedKey ? { ...key, active: false, keyPressed: false } : key
      )
    );
  }
};

useEffect(() => {
  // Event listener'ları ekleyelim
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyRelease);
  // Component unmount olduğunda event listener'ları kaldıralım
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyRelease);
  };
}, []); // Bu effect sadece bir kere çalışsın

return (
  <div className='wrapper'>
    <div className='main-container' onClick={handleKeyPress}>
      <Settings {...propsBundle} />
      <Keys showKeys={showKeys} synthKeys={synthKeys} />
    </div>
  </div>
);
}
//Ne tür bir olay?

//Bu olaylar fare tıklamaları (mouseDown ve mouseUp) veya klavye tuş basma ve bırakma olayları (keyDown ve keyUp) gibi kullanıcı etkileşimlerini temsil eder.
//Olay synthKey state nesnelerinden birine karşılık geliyor mu?

//Eğer kullanıcı bir synth tuşuna tıklarsa veya klavyeden bir tuşa basarsa, bu olay synthKeys state nesnelerinden birine karşılık gelir.
//Eğer öyleyse, hangisi? (Buna hedef nesne deyin.)

//Hangi synth tuşuna tıkladığını veya hangi klavye tuşunu bastığını belirlemek için, tıklanan veya basılan tuşun bilgisayar tuşu (computerKey) özelliğini synthKeys state dizisindeki nesnelerle karşılaştırabiliriz. Böylece, hedef nesneyi belirleyebiliriz.
//synthKeys state dizisini güncelleyin:Hedef nesneyi güncellemek için, belirlenen nesnenin active özelliğini true olarak ayarlamalıyız.
//Klavyeden bir tuşa basıldığında, ayrıca hedef nesnenin keyPressed özelliğini de true olarak ayarlamalıyız.
//Klavyeden bir tuş bırakıldığında, hedef nesnenin keyPressed özelliğini false olarak ayarlamalıyız.