export function generateNameSteps(
  name: string = "Brendan Smith"
): {
  text: string,
  time: number
}[] {
    const speedUp = localStorage.getItem('introSeen') === 'true'
      ? 2
      : 1

    const fast = 100 / speedUp;
    const slow = 300 / speedUp;
    const blinkingArr = [
      { text: ' ', time: slow },
      { text: '_', time: slow },
      { text: ' ', time: slow },
      { text: '_', time: slow }
    ];

    // Adds initial blinking
    const nameSteps = Array.from(blinkingArr);

    // Adds name typing
    for (let i = 1; i <= name.length; ++i)
      nameSteps.push({ text: name.substring(0, i) + '_', time: fast });

    // Adds blinking after the name
    nameSteps.push(...blinkingArr.map(item => ({
      text: name + item.text,
      time: item.time
    })));

    // Adds final name
    nameSteps.push({ text: name, time: slow + 100 / speedUp });

    return nameSteps;
}
