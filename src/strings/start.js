import {stripIndent} from 'common-tags';

const start = {
  introduction: stripIndent`
    ⚠️ 이 봇은 개인적인 목적을 위해 만들어졌으며, 명령어는 인증된 사용자만 사용할 수 있습니다.

    로그인하려면 /login 명령어를 사용하세요.
  `,
};

export {
  start as default,
};
