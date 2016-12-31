const saucenao = {
  search: '🔍 검색할 압축된 이미지를 보내주세양!',
  found(data) { return `🔍 이미지를 찾았어양!\n\n${data}`; },
  notFound: '❌ 이미지를 찾지 못했어양..',
};

export {
  saucenao as default,
};
