(function () {
  'use strict';
  const topic = location.pathname.split('/').pop().replace(/\.html$/, '');
  const simple = ['clothes', 'feeling', 'fooddrinks', 'householditems'];
  const alternate = ['familyfriends', 'verbs'];
  const counting = ['animals', 'schoolsupplies'];
  let prepare, questions, answers, primary;

  if (simple.includes(topic)) {
    prepare = () => { countList = shuffleArray(sentenceQuestions); countIdx = 0; };
    questions = () => countList;
    answers = item => [item.answer];
    primary = item => item.answer;
  } else if (alternate.includes(topic)) {
    prepare = () => { countList = shuffleArray(sentenceQuestions); countIdx = 0; };
    questions = () => countList;
    answers = item => [item.answer, item.altAnswer];
    primary = item => item.answer;
  } else if (counting.includes(topic)) {
    prepare = () => { countList = shuffleArray(countGameQuestions); countIdx = 0; };
    questions = () => countList;
    primary = item => 'There ' + (item.count === 1 ? 'is' : 'are') + ' ' + item.count +
      ' ' + (item.count === 1 ? item.itemSingular : item.itemPlural);
    answers = item => [primary(item)];
  } else if (topic === 'numbers') {
    prepare = () => { countList = shuffleArray(countGameQuestions); countIdx = 0; };
    questions = () => countList;
    const sentence = (item, count) => 'There ' + (item.count === 1 ? 'is' : 'are') +
      ' ' + count + ' ' + (item.count === 1 ? item.itemSingular : item.itemPlural);
    primary = item => sentence(item, numberToWords(item.count).toLowerCase());
    answers = item => [sentence(item, item.count), primary(item)];
  } else if (topic === 'dates') {
    prepare = () => { countList = shuffleArray(dateQuestions); countIdx = 0; };
    questions = () => countList;
    primary = item => item.answer;
    answers = item => ['It is ' + item.target, "It's " + item.target,
      'Today is ' + item.target, "Today's " + item.target, item.target];
  } else if (topic === 'fruits') {
    prepare = () => { countIdx = 0; };
    questions = () => fruitQuestions;
    primary = item => item.targetSentence;
    answers = item => item.type === 'plural'
      ? ['There are ' + item.count + ' ' + item.pluralName,
        'They are ' + item.count + ' ' + item.pluralName,
        item.count + ' ' + item.pluralName,
        'There are ' + item.count + ' ' + item.fruitName,
        item.count + ' ' + item.fruitName]
      : ['It is ' + item.article + ' ' + item.fruitName,
        "It's " + item.article + ' ' + item.fruitName,
        'This is ' + item.article + ' ' + item.fruitName,
        item.article + ' ' + item.fruitName, item.fruitName];
  } else return;

  const game = window.DanhLegacyGame4.create({
    topic, prepare, questions, answers, primary,
    setIndex: value => { countIdx = value; },
    render: () => loadCountQuestion(),
    speak: value => speak(value),
    sound: correct => playSoundEffect(correct ? 'correct' : 'wrong')
  });
  initCountGame = () => game.open();
  checkCountSentence = () => game.check();
  if (typeof revealCountSentence === 'function') revealCountSentence = () => game.reveal();
  if (typeof revealCountAnswer === 'function') revealCountAnswer = () => game.reveal();
})();
