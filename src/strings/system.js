import {stripIndent} from 'common-tags';

const system = {
  hello: '🎉 헠헠 반가워양! 유코에요 👏',
  memberJoin(userName) { return `🎉 어서오세양 ${userName} 주인님 🌟 잘 오셨어요!`; },
  memberLeft(userName) { return `💔 히이익! ${userName} 주인님 💦 잘 가세요..`; },
  start: stripIndent`
  ⚠️ 이 봇은 개인적인 목적을 위해 만들어졌으며, 명령어는 인증된 사용자만 사용할 수 있습니다.

  로그인하려면 /login 명령어를 사용하세요.
  `,
  help: stripIndent`
    *❤️ 안녕하세요 유코에요!*

    명령어 목록은 메시지창의 \`[/]\` 버튼을 누르면 모두 볼 수 있어요! (\`'/'\`를 직접 쳐도 돼요)

    🔮 명령어 리스트 설명

        \`/command (명령어설명) [최소~최대값] <별명>\`

    🔰 명령어

        ▶️ /command - 명령어만 쓰면 기본값이 자동으로 사용돼요!
        ▶️ /command 1234 - 원하는 값을 대입하세요!
        ▶️ /커맨드 1234 - 영문 명령어 대신, 별명을 사용할 수도 있어요!

    🔒 로그인

        초기 사용시, 봇 업데이트시 로그인이 필요해요! 등록된 ID라면 자동으로 인증이 완료되니 /login 명령어만 입력하세요.
  `,
};

export {
  system as default,
};
