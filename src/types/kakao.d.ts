export {} //모듈이다

declare global { // 전역 선언 기본 window 객체에 타입을 추가할때 씀
    // 브라우져 전역 객체(window), Node 전역객체(globalThis)
  interface Window {
    kakao: any;
  }
}
