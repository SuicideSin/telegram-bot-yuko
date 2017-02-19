const auth = {
  notSigned: '🔒 인증되지 않은 사용자예양!\n로그인 하려면 /login 명령어를 사용하세양!',
  alreadySigned: '🔓 이미 주인님이에양!\n로그아웃 하려면 /logout 명령어를 사용하세양!',
  signin(fullUsername) { return `🔓 로그인 성공!\n어서오세양, ${fullUsername} 주인님!`; },
  signout(fullUsername) { return `🔐 로그아웃 성공!\n안녕히 가세양, ${fullUsername} 주인님!`; },
  userDisabled(fullUsername) { return `🔒 ${fullUsername} 아조씨는 밴 당했어요..`; },
  userNotFound: '🔒 사용자를 찾을 수 없어양..',
};

export {
  auth as default,
};
