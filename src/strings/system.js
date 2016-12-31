const system = {
  hello: '🎉 헠헠 반가워양! 유코에요 👏',
  memberJoin(userName) { return `🎉 어서오세양 ${userName} 주인님 🌟 잘 오셨어요!`; },
  memberLeft(userName) { return `💔 히이익! ${userName} 주인님 💦 잘 가세요..`; },
};

export {
  system as default,
};
