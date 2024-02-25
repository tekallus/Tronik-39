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

useEffect(() => {
// Kullanıcı bir tuşu bastiginda tetiklenecek olan fonksiyon
  const handleKeyDown = (event) => {
    // 1. Klavyeden basılan tuşa karşılık gelen synth tuşunu bulur
    const pressedKey = synthKeys.find(key => key.computerKey === event.key.toLowerCase());
    
    // 2. Eğer bir tuş bulunduysa ve tuş daha önce basılmamışsa devam eder
    if (pressedKey && !pressedKey.keyPressed) {
      // 3. Synth tuşlarını günceller ve basılan tuşu etkinleştirir
      setSynthKeys(prevKeys =>
        prevKeys.map(key =>
          // 4. Eğer tuş bulunan tuşa karşılık geliyorsa, tuş durumunu günceller
          key.keyName === pressedKey.keyName ? { ...key, active: true, keyPressed: true } : key
        )
      );
    }
  };
  

// Kullanıcı bir tuşu bıraktığında tetiklenecek olan fonksiyon
const handleKeyRelease = (event) => {
  // Bu satır, tuş bırakma (`keyup`) olayının tetiklendiğini ve hangi tuşun bırakıldığını konsola yazdırır.
  console.log(`KeyUp Event Triggered: ${event.key}`);

  // `event.key` kullanarak, bırakılan tuşa karşılık gelen `synthKeys` dizisindeki nesneyi bulur.
  // `toLowerCase()` metodu, büyük harf/küçük harf duyarlılığı sorunlarını önlemek için kullanılır.
  const releasedKey = synthKeys.find((key) => key.computerKey === event.key.toLowerCase());

  // Eğer bir tuşa karşılık gelen bir nesne bulunursa, bu blok çalışır.
  if (releasedKey) {
    // Hangi tuşun bırakıldığını konsola yazdırır. Bu, hata ayıklama sırasında yararlı olabilir.
    console.log(`Released Key: ${releasedKey.keyName}`);

    // `setSynthKeys` fonksiyonu, `synthKeys` dizisinin güncellenmiş bir kopyasını oluşturur.
    // Bu, React'te state'i doğru bir şekilde güncellemek için kullanılan bir yaklaşımdır.
    setSynthKeys((prevKeys) =>
      // `prevKeys.map` metodu, `synthKeys` dizisindeki her nesneyi döngüye sokar.
      prevKeys.map((key) =>
        // Eğer döngüdeki nesne, bırakılan tuşa karşılık gelen nesne ise,
        // nesnenin `active` ve `keyPressed` özelliklerini `false` olarak günceller.
        key.keyName === releasedKey.keyName ? { ...key, active: false, keyPressed: false } : key
        // Diğer tüm nesneler olduğu gibi kalır.
        // Bu, yalnızca hedeflenen nesnenin durumunu değiştirirken, diğerlerini değiştirmemeyi sağlar.
      )
    );
  }
};


  // Event listener'ları ekleyelim
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyRelease);
  // Component unmount olduğunda event listener'ları kaldıralım
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyRelease);
  };
}, [synthKeys]); // Bağımlılıklara synthKeys'i ekledik
// Fare eylemi işlendiğinde çalışacak fonksiyonu tanımlayalım
const handleMouseAction = (keyName, action) => {
  // Synth tuşlarını günceller ve fare eylemine göre tuşu etkinleştirir veya devre dışı bırakır
  setSynthKeys(prevKeys =>
    prevKeys.map(key =>
      key.keyName === keyName ? { ...key, active: action === 'down', keyPressed: action === 'down' } : key
    )
  );
};

function playNote(note) {
  // 'note' parametresiyle bir yeni Audio nesnesi oluşturulur. Bu parametre, çalınacak ses dosyasının yoludur.
  let audio = new Audio(note);

  // Audio nesnesinin ses seviyesi ayarlanır. 'volume' state'i yüzde olarak saklandığı için, 100'e bölünerek Audio API'sinin beklediği aralığa (0.0 - 1.0) çevrilir.
  audio.volume = volume / 100;

  // Audio nesnesinin playbackRate (oynatma hızı) ayarlanır. playbackRate, 10 veya altında ise, doğrudan 10'a bölünerek ayarlanır; 10'dan büyükse, 9 çıkarılır. Bu, oynatma hızını ayarlamak için özel bir mantık olabilir.
  audio.playbackRate = playbackRate <= 10 ? playbackRate / 10 : playbackRate - 9;

  // Audio nesnesinin loop (döngü) özelliği, 'loop' state'ine göre ayarlanır. Eğer 'loop' true ise, ses dosyası sürekli tekrarlanır.
  audio.loop = loop;

  // Audio.play() metodu çağrılır. Bu metot, ses dosyasının oynatılmasını başlatır ve bir Promise döndürür. Bu, asenkron bir işlemdir.
  audio.play().then(() => {
    // Eğer 'loop' true ise ve ses dosyası başarıyla oynatılmaya başlanırsa, bu ses dosyası 'loopingNotes' array'ine eklenir. Bu, döngüde oynatılan ses dosyalarını takip etmek için kullanılabilir.
    if (loop) {
      setLoopingNotes([...loopingNotes, audio]);
    }
  }).catch((error) => {
    // Eğer ses dosyası oynatılamazsa (örneğin, dosya bulunamazsa veya bir hata oluşursa), bu hata yakalanır ve konsola yazdırılır. Bu, hata ayıklama sırasında yararlıdır.
    console.error("Ses dosyası oynatılamadı", error);
  });
}

return (
  <div className='wrapper'>
    <div className='main-container'>
      <Settings {...propsBundle} />
      <Keys showKeys={showKeys} synthKeys={synthKeys} onKeyAction={handleMouseAction} />
    </div>
  </div>
);
}