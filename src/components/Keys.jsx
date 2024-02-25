export default function Keys({ synthKeys, showKeys, onKeyAction }) {
  const handleMouseDown = (keyName) => {
    onKeyAction(keyName, 'down');
  };

  const handleMouseUp = (keyName) => {
    onKeyAction(keyName, 'up');
  };

  const keyButtons = synthKeys.map((key) => {
    const { displayName, computerKey, keyName, color } = key;
    const activeClass = key.keyPressed ? 'active' : '';
    const keyClassName = ['key', keyName, color, activeClass].join(' ');
    const keyNameToShow = showKeys.musicKeys
      ? displayName
      : showKeys.computerKeys
      ? computerKey
      : '';

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
