export default function Keys({ synthKeys, showKeys, onKeyAction }) {
  // Bu fonksiyon, bir tuşa fare ile basıldığında çağrılır. 'keyName' parametresi, basılan tuşun adını temsil eder.
  const handleMouseDown = (keyName) => {
    // 'onKeyAction' prop'u, 'keyName' ve eylem tipi olarak 'down' ile çağrılır. Bu, bir tuşa basıldığını belirtir.
    onKeyAction(keyName, 'down');
  };

  // Bu fonksiyon, bir tuşa fare ile basılıp bırakıldığında çağrılır.
  const handleMouseUp = (keyName) => {
    // 'onKeyAction' prop'u, 'keyName' ve eylem tipi olarak 'up' ile çağrılır. Bu, bir tuşun bırakıldığını belirtir.
    onKeyAction(keyName, 'up');
  };

  // 'synthKeys' dizisindeki her bir eleman için bir buton oluşturulur.
  const keyButtons = synthKeys.map((key) => {
    // Destructuring ile 'key' nesnesinden gerekli özellikler çıkarılır.
    const { displayName, computerKey, keyName, color } = key;
    // 'keyPressed' durumuna göre 'active' CSS sınıfı atanır.
    const activeClass = key.keyPressed ? 'active' : '';
    // Butonun CSS sınıfları birleştirilerek oluşturulur.
    const keyClassName = ['key', keyName, color, activeClass].join(' ');
    // Gösterilecek tuş adı 'showKeys' durumuna göre belirlenir.
    const keyNameToShow = showKeys.musicKeys ? displayName : showKeys.computerKeys ? computerKey : '';

    return (
      <button
        key={keyName}
        className={keyClassName}
        data-note={keyName}
        onMouseDown={() => handleMouseDown(keyName)}
        onMouseUp={() => handleMouseUp(keyName)}
        // autoFocus attribute removed for simplification
      >
        {keyNameToShow}
      </button>
    );
  });

  return <div className='keys-container'>{keyButtons}</div>;
}
