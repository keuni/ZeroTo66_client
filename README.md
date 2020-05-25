# ZeroTo66-client

필요한 extension : prettier, eslint  
prettier 설정 : Tab Width - 2, Single Quote - true

node version : 13.11.0 ( cli : nvm install 13.11.0 )  
branch name : feature\_"name of feature"

커밋 메시지 가이드라인 : 'git commit' 활용, 맨 윗줄에는 영어로 body는 한글로 변경사항 설명하기.  
참고 접두사 : ADD, FIX, DELETE

5/19 - 경은 : 리액트 설치 및 라우터 기본 세팅 완료
npm install -> client -> npm install(2번 필요)

5/19 - 현영 : Signup 폼 구성 완료, Signup 동작코드 작성 ,Modal창 추가
Signup버튼 클릭시 login화면으로 돌아가야하는데 err발생함
Modal창은 특정 버튼 클릭후 떠야하는데 그냥 보여짐

5/20 - 현영 : 수정이 필요한부분 수정, 모달창 기능추가
Signup버튼 클릭시 loging화면으로 돌아가기 수정
회원가입 작성창이 빈칸이거나, db에 있는 정보의 경우 모달창이 보여짐.

5/20 - 경은 : login, logout 기능 만들고 배포하여 테스트 완료

5/21 - 경은 : 오늘부터 진행할 스프린트2 위해 따로 작업해야하는 습관리스트와 달력 라우트 변경 후,
css로 부분 나누어 놓았음.

5/21 - 현영 : 습관리스트, 습관리스트 정보로 나눠서 작성.
HabitInfo에서 db정보를 받아오고, 그걸 HabitListe에 보여주게됨.
db로부터 정보받아오는 부분은 작성해야함.(테스트필요)
//+ db get api 작성함.
//+ 테스트완료

5/21 - 경은 : add habit 버튼 추가 / css 수정 / 개발 및 로컬용 url다르게 불러오기 위해 config 파일사용

5/22 - 경은 : habit post 완료, 기존 리스트에 추가하여 보여주는 작업 완료

5/22 - 현영 : 습관리스트에 체크박스 추가 /
습관 완료시 사용할 체크 기능
// + 체크박스 클릭시 해당 습관이름에 취소선 기능 추가
// + 스프린트2 배포전 최종 정리
// + 리턴해달라는 노란줄이 생성되어 HabitList에 componentDidMount 87번째줄 'data.map' -> 'data.forEach' 으로 변경했습니다.

5/24 - 경은 : 사이즈별 mypage 좌측 습관 관련 내용들 css 수정
로그아웃 버튼을 햄버거로 수정(모바일에서 로그아웃 버튼의 위치가 이상했음)

5/25 - 경은 : 습관별 상세 페이지 완성, 성공률 달력에 반영,
로그인과 회원가입 모달창 중복 css 통합
