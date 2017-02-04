import * as lookup from './lookup';

const composedQuery = [

].map((elem) => {});

// store와 sheets의 용도가 달라 한가지 형태의 API로 구현하기가 힘들다.
//
// store는 API를 미리 지정할 수 있지만 sheets는 따로 자체적으로 각 스크립트에서 가져오는 로직이 필요하다.
//
// 아니면 sheets의 모든 API에 auth를 미리 다 넣어두는 방법이 있을 것이라고 생각한다.
//
// redux 구조와 비슷하게 shape 데코레이터를 넣어서 각 스토어에 기본적인 데이터 구조를 정의할 수 있도록 한다.
// 컴포넌트 컴포지션을 활용하는 방법도 있으리라고 본다.
