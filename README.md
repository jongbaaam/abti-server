<br>

<div align="center">

  <img src="https://github.com/user-attachments/assets/cd64d8da-ac76-48f8-9c83-d14eef48cffc">

<br>

**ABTI**는 웹 사이트에 A/B 테스트 환경을 구축하고 진행한 테스트의 검증된 결과를 제공하는 서비스입니다.

<div> - </div>

<br>

**'어떤 UI를 제공하는 것이 사용자 경험 측면에서 좋을 것인가.'** 에 대한 의사결정은 근거 기반으로 이루어져야 합니다.

이를 위해 [A/B 테스트](https://ko.wikipedia.org/wiki/A/B_%ED%85%8C%EC%8A%A4%ED%8A%B8)를 활용하여 근거를 제시하고  
더 나은 사용자 경험을 위한 의사결정에 도움을 주고자 프로젝트를 기획하게 되었습니다.

<br>

#### [클라이언트 레포지토리](https://github.com/jongbaaam/abti-client) | [서버 레포지토리](https://github.com/jongbaaam/abti-server)

</div>

<br>

# 목차

<!-- toc -->

[기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)

[핵심 기능 구현](#%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

- [1. 방문자 행동 데이터 수집](#1-%EB%B0%A9%EB%AC%B8%EC%9E%90-%ED%96%89%EB%8F%99-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%88%98%EC%A7%91)
  - [1-1. HTTP 쿠키를 활용한 방문자 특정](#1-1-http-%EC%BF%A0%ED%82%A4%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%B0%A9%EB%AC%B8%EC%9E%90-%ED%8A%B9%EC%A0%95)
  - [1-2. Histroy API를 활용한 테스트 대상 페이지 방문 지표 수집](#1-2-histroy-api%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8C%80%EC%83%81-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B0%A9%EB%AC%B8-%EC%A7%80%ED%91%9C-%EC%88%98%EC%A7%91)
  - [1-3. 이벤트 위임 패턴을 활용한 방문자 전환 이벤트 추적](#1-3-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84-%ED%8C%A8%ED%84%B4%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%B0%A9%EB%AC%B8%EC%9E%90-%EC%A0%84%ED%99%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B6%94%EC%A0%81)
- [2. 안정성과 최적화를 고려한 테스트 환경 구축](#2-%EC%95%88%EC%A0%95%EC%84%B1%EA%B3%BC-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EA%B3%A0%EB%A0%A4%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95)
  - [2-1. 스크립트의 안정적인 실행 환경을 위한 코드 난독화](#2-1-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%95%88%EC%A0%95%EC%A0%81%EC%9D%B8-%EC%8B%A4%ED%96%89-%ED%99%98%EA%B2%BD%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%BD%94%EB%93%9C-%EB%82%9C%EB%8F%85%ED%99%94)
  - [2-2. 웹 성능 최적화를 고려한 HTTP 캐싱](#2-2-%EC%9B%B9-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EA%B3%A0%EB%A0%A4%ED%95%9C-http-%EC%BA%90%EC%8B%B1)

[회고](#%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

<br>

## 기술 스택

### 클라이언트

<div align="left">
  <img alt="React" src="https://img.shields.io/badge/react-2B2E3A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-212121.svg?style=for-the-badge&logo=windows-terminal&logoColor=white">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="Axios" src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white">
</div>

### 서버

<div align="left">
  <img alt="Node" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Express-2B2E3A?style=for-the-badge&logo=express&logoColor=white">
  <img alt="MongoDB Atlas" src="https://img.shields.io/badge/Mongo_DB_&_MONGOOSE-343434?style=for-the-badge&logo=mongodb&logoColor=4EA94B">
</div>

### 배포

<div align="left">
  <img alt="Amazon AWS" src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
  
  <img alt="Firebase" src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black">
</div>

<br>
<br>

## 핵심 기능 구현

### 1. 방문자 행동 데이터 수집

<!-- AB 테스트는 사용자 행동 데이터를 바탕으로 특정 변화가 실제로 목표 달성에 긍정적인 영향을 미치는지 검증하기 위한 방법 -->

> A/B 테스트 결과를 도출하기 위해서는 방문자 행동 데이터를 수집하는 과정이 선행되어야합니다.

<div align="center">

<br>

<img width="800" alt="방문자 행동 데이터 수집 과정 이미지" src="https://github.com/user-attachments/assets/73390a58-633e-4507-8352-6b5fba593c75">

_방문자 행동 데이터 수집 과정_

<br>

</div>

이 과정을 통해 수집된 행동 데이터는 테스트 결과를 도출하는 데 활용되며, 더 나은 사용자 경험을 제공하기 위한 의사결정에 기여합니다.

<br>

#### 1-1. HTTP 쿠키를 활용한 방문자 특정

정확한 테스트 결과를 도출하려면 테스트 대상 웹 페이지 방문자를 특정하여 중복된 지표 집계를 방지하는 것이 중요합니다.

이를 위해 **HTTP 쿠키**를 활용하여 방문자를 특정하는 식별 정보를 사용하도록 하였습니다.

<div align="center">

<br>

<img width="800" alt="방문자 식별 정보 HTTP 쿠키 할당 이미지" src="https://github.com/user-attachments/assets/5bc6fa55-a0a1-4e12-9b70-ffae1425fcca">

_방문자 식별 정보 HTTP 쿠키 할당_

<br>

</div>

HTTP 쿠키는 웹 서버에서 생성하여 브라우저로 전송하는 `"name=value"`쌍의 작은 데이터로 설정된 기간 또는 브라우저 사용자 세션 동안 브라우저 내 저장됩니다.

또한 저장된 쿠키는 동일한 서버로 보내는 HTTP 요청에 해당 쿠키를 포함하여 전송합니다.

하지만 HTTP 쿠키는 기본적으로 개인 정보 보호 정책으로 인해 크로스 사이트(Cross-site) 요청에 쿠키 전송을 제한합니다.

현재 테스트 대상 웹 페이지의 출처(Origin)와 방문자 행동을 수집하는 서버의 출처(Origin)가 다른 상황이기 때문에
크로스 사이트(Cross-site) 요청에 해당됩니다.

이러한 문제를 해결하기 위해 `SameSite` 속성을 활용했습니다.

`SameSite` 속성은 크로스 사이트 요청에 쿠키 전송 여부를 제어하는 속성입니다.

<div align="center">

|           |                  Strict                  |                         Lax                         |                   None                   |
| :-------: | :--------------------------------------: | :-------------------------------------------------: | :--------------------------------------: |
|  기본값   |                                          |                         ✅                          |                                          |
| 동작 방식 | 크로스 사이트 요청에 <br> 쿠키 전송 제한 | `Strict`과 유사, <br>몇 가지 예외적인 요청에는 전송 | 크로스 사이트 요청에 <br> 쿠키 전송 가능 |

_SameSite 속성 정책 종류_

</div>

<br>

해당 속성의 기본 값은 `"Lax"`로 동일한 사이트 요청에 쿠키가 전송되며, 특정 조건을 만족한 경우 크로스 사이트 요청에 쿠키가 전송되기도 하지만 현재의 경우 해당 되지 않았습니다.

이에 따라 `"None"`으로 설정하여 크로스 사이트 요청에서 쿠키를 전송을 허용하고, 동시에 `Secure` 속성을 추가해 HTTPS 프로토콜 요청에만 쿠키가 전송되도록 보안을 강화하였습니다.
이를 통해 크로스 사이트 요청으로 인해 발생할 수 있는 [CSRF](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%9A%94%EC%B2%AD_%EC%9C%84%EC%A1%B0)을 방지하고자 했습니다.

추가적으로 `HttpOnly`을 설정하여 JavaScript로 쿠키에 접근할 수 없도록하여 방문자 식별 정보를 조작하는 경우를 방지했습니다.

```javascript
// 테스트 대상 웹 페이지 방문자 정보 조회 API 서버 내부 응답 로직

res.cookie("방문자_식별_정보_NAME", 방문자_식별_정보_VALUE, {
  domain: 쿠키_전송_서버_도메인,
  secure: true,
  httpOnly: true,
  sameSite: "none",
  ...
});
```

이를 통해, 방문자 식별 정보를 브라우저 내 저장하고 방문자 행동 데이터 수집 HTTP 요청 시 해당 방문자를 식별하여 중복된 지표가 집계되는 것을 방지할 수 있었습니다.

<br>

#### 1-2. Histroy API를 활용한 테스트 대상 페이지 방문 지표 수집

방문 지표는 방문자가 테스트 대상 페이지를 방문했을 때 정확히 수집될 수 있도록 웹 애플리케이션의 구조를 고려하여
수집해야 했습니다.

이를 위해 **History API**를 활용하여 테스트 대상 페이지의 방문 이벤트를 감지하고 방문 지표를 수집하도록 하였습니다.

웹 애플리케이션의 구조는 페이지 렌더링 및 전환 방식에 따라 SPA과 MPA이 존재합니다.

<div align="center">

|             |         SPA(Single Page Application)         | MPA(Multi Page Application)  |
| :---------: | :------------------------------------------: | :--------------------------: |
|   렌더링    |      클라이언트 측에서 HTML 마크업 생성      | 서버 측에서 HTML 마크업 생성 |
| 페이지 전환 | 전환에 필요한 데이터를 전달 받아 페이지 갱신 | 해당하는 새로운 페이지 로드  |

_페이지 렌더링 및 전환 방식에 따른 웹 애플리케이션 구조 종류_

<br>

</div>

MPA의 경우 페이지 전환 시 새로운 페이지를 로드하기 때문에 테스트 대상 페이지 HTML에 스니펫 코드를 추가하여 페이지 로드 시 방문 지표를 수집할 수 있습니다.

이에 반해, SPA는 단일 페이지에서 필요한 데이터만 전달받아 페이지를 갱신하여 페이지 전환을 처리하기 때문에 MPA와 동일한 방법으로 지표를 수집할 경우 단일 페이지 로드 시 방문 지표가 정확하지 않은 시점에 지표가 수집됩니다.

정확한 방문 지표를 수집하기 위해 방문자의 페이지 전환 흐름을 추적하여 테스트 대상 페이지 방문 시 지표가 수집될 수 있도록 해야했습니다.

SPA에서 페이지 전환을 처리하기 위해 일반적으로 사용하는 라우터 라이브러리는 내부적으로 `History API`를 사용합니다.

`History API`는 브라우저의 세션 히스토리 스택을 탐색하거나 수정할 수 있는 기능을 제공합니다.

그 중 `pushState()`와 `replaceState()` 메서드는 세션 히스토리 스택을 수정하고, URL을 변경하는데 활용됩니다.

<div align="center">

<img alt="세션 히스토리 스택 수정 메서드" src="https://github.com/user-attachments/assets/a55c782b-cffb-48e3-9dc6-d91a082a29fb">

_세션 히스토리 스택 수정 메서드_

<br>

</div>

따라서, 두 메서드를 재정의하여 기존 동작은 유지하고, 방문 지표를 수집하는 기능을 추가하여 정확 방문 지표를 수집하고자 하였습니다.

```javascript
// `pushState()`와 `replaceState()` 메서드 재정의 로직

기존_PUSH_STATE_메서드 = history.pushState;
기존_REPLACE_STATE_메서드 = history.replaceState;

history.pushState = function (...args) {
  기존_PUSH_STATE_메서드.apply(this, args);

  페이지_전환_추적_함수();
};

history.replaceState = function (...args) {
  기존_REPLACE_STATE_메서드.apply(this, args);

  페이지_전환_추적_함수();
};
```

<br>

또한, `popstate` 이벤트 리스너를 추가하여 브라우저의 앞으로 가기나 뒤로 가기 버튼을 통해 세션 히스토리 스택을 탐색하여 이루어지는 페이지 전환도 감지할 수 있도록 하였습니다.

```javascript
// popstate 이벤트 핸들러 추가 로직

window.addEventListener("popstate", 페이지_전환_이벤트_핸들러_함수);
```

<br>

이를 통해, 웹 애플리케이션의 구조에 구애받지 않고 페이지 전환 흐름을 추적하여 테스트 페이지 방문 시 정확한 방문 지표를 수집할 수 있도록 할 수 있었습니다.

<br>

#### 1-3. 이벤트 위임 패턴을 활용한 방문자 전환 이벤트 추적

전환 지표는 특정 UI 요소에서 방문자가 수행한 클릭이나 구매 같은 행동 데이터를 기반으로 수집해야합니다.

이를 위해 **이벤트 위임(Event Delegation) 패턴**을 활용하여 방문자의 행동 이벤트를 감지하고, 전환 이벤트를 파악하여 전환 지표를 수집하도록 하였습니다.

행동 데이터는 웹 페이지에서 발생한 클릭, 스크롤, 키 입력과 같은 방문자가 수행한 동작 이벤트 데이터를 의미합니다.

이 중 클릭 이벤트는 특정 UI 요소에서의 명확한 사용자 의도를 보여주는 가장 일반적인 행동 데이터입니다.

따라서 현재 프로젝트에서는 특정 UI 요소에 전환 이벤트 핸들러를 할당하여, 클릭 전환 이벤트 발생 시 전환 지표를 수집하고자 했습니다.

하지만 여러 테스트가 진행되는 웹 프로젝트에서 각각의 UI 요소에 이벤트 핸들러를 할당하는 것은 불필요한 메모리 사용으로 인한 자원 낭비, 동적으로 생성되지 않은 UI 요소에 이벤트 핸들러를 할당하여 발생되는 에러 등 성능 저하와 안정성 측면에서 문제를 야기할 수 있습니다.

<div align="center">

<img alt="생성되지 않은 요소에 이벤트 핸들러를 할당할 경우 에러 이미지" src="https://github.com/user-attachments/assets/5818c63b-93a5-444e-9b00-b1b3ab784fd3">

_생성되지 않은 요소에 이벤트 핸들러를 할당할 경우 에러_

<br>

</div>

이러한 문제를 해결하기 위해 `이벤트 버블링(Event Bubbling)`을 활용한 이벤트 위임 패턴을 사용했습니다.

`이벤트 버블링`은 HTML요소에서 발생한 이벤트가 자식 요소에서 최상위 요소에 도달할 때 까지 전파되는 과정을 의미합니다.

<div align="center">

<img width="600" alt="이벤트 전파 과정 이미지" src="https://github.com/user-attachments/assets/74b0636c-84be-460f-87a8-0e4b16020d5b">

_이벤트 전파(Event Propagation) 과정_

<br>

</div>

이벤트 위임 패턴은 다수의 자식 요소에 개별적으로 이벤트 핸들러를 할당하지 않고 하나의 부모 요소에 이벤트 핸들러를 할당하여 이벤트 버블링을 통해 자식 요소에서 발생한 이벤트를 처리하는 방법입니다.

```javascript
// 이벤트 위임 패턴을 적용한 이벤트 핸들러 로직

window.addEventListener("click", (event) => {
  클릭된_요소 = event.target;

  클릭된_요소_식별값 = 클릭된_요소의 ID 속성 값 또는 CLASS 명;

  if (클릭된_요소_식별값 !== 추적_요소_식별값) {
    return;
  }

  ...
});
```

이 패턴을 활용하여 최상위 요소에 이벤트 핸들러를 추가함으로써, 자식 요소에서 발생한 클릭 전환 이벤트를 감지하고 이를 상위 요소에서 처리할 수 있었습니다.

이를 통해 전환 지표 수집 과정을 보다 안정적이고 효율적으로 구현할 수 있었습니다.

<br>

### 2. 안정성과 최적화를 고려한 테스트 환경 구축

테스트 환경은 스니펫 스크립트를 제공함으로써 다양한 사용자 웹 프로젝트 환경에 빠르고 쉽게 적용 가능하였습니다.

또한, 테스트의 안정적인 실행 환경을 제공함과 더불어 사용자의 웹 프로젝트에 성능 저하가 발생하지 않도록 코드 **난독화(Uglify)** 와 **HTTP 캐싱**을 통해 최적화를 진행하였습니다.

<br>

#### 2-1. 스크립트의 안정적인 실행 환경을 위한 코드 난독화

테스트 결과의 신뢰성과 사용자의 웹 프로젝트의 안정성을 고려하여 **난독화(Uglify)** 된 스니펫 스크립트를 제공하였습니다.

난독화는 자바스크립트 코드의 함수, 변수 명 등을 변경하거나 코드의 구조를 변경하여 분석하기 어려운 형태로 변환하는 것을 의미합니다.

즉, 코드의 가독성과 구조를 복잡하게 변형하여 외부에서 코드를 수정하거나 구조를 파악하기 어렵게 만듭니다.

<div align="center">

<img width="800" alt="자바스크립트 코드 난독화 예시 이미지" src="https://github.com/user-attachments/assets/eff829d1-57e1-461b-9916-fd7e500a1158">

_자바스크립트 코드 난독화(Uglify) 예시_

<br>

</div>

난독화된 스크립트를 제공하는 이유는 잘못된 행동 데이터가 수집되거나 사용자의 웹 프로젝트에 오류를 발생 시키는 등
코드를 조작하여 일어날 수 있는 문제를 방지하기 위해서 입니다.

따라서, 코드의 변조를 방지하고 스크립트가 의도한 대로 동작할 가능성을 높일 수 있도록 난독화된 스니펫 스크립트를 제공하고자 하였습니다.

또한, 난독화 과정에는 미사용 코드, 공백·줄바꿈·들여쓰기 등 코드 기능에는 불필요한 부분을 제거하는 `축소(Minify)` 과정이 존재하기 때문에 스크립트의 크기가 작아집니다.

<div align="center">

<img width="800" alt="스크립트 크기 축소 및 로딩 속도 개선 이미지" src="https://github.com/user-attachments/assets/1731abf1-cdf3-4b1a-a257-64f927048583">

_축소(Minify)으로 인한 스크립트 크기 축소 및 페이지 로딩 속도 개선_

<br>

</div>

이는 스크립트 로딩 속도를 향상시켜 사용자의 웹 프로젝트 성능 유지와 최적화에 기여했습니다.

<br>

#### 2-2. 웹 성능 최적화를 고려한 HTTP 캐싱

스니펫 스크립트 추가 시 사용자의 웹 프로젝트에 페이지 로드와 같은 웹 성능에 영향을 최소화하는 것은 서비스 사용자 경험 측면에서 중요한 고려 사항이 였습니다.

이를 위해 **HTTP 캐싱**을 적용하여 최적화를 진행하고자 하였습니다.

HTTP 캐싱은 요청과 연관된 응답을 저장하고 동일한 후속 요청에 저장된 응답을 재사용하여 응답 속도를 향상 시키고 서버 부하를 줄이는 웹 성능 최적화 기술입니다.

캐싱을 적용하기 위해선 캐싱 관련 응답 헤더를 설정해야합니다.

<div align="center">

|      |            Cache-Control             |              Etag              |      Last-Modified      |
| :--: | :----------------------------------: | :----------------------------: | :---------------------: |
| 기능 |       캐시 방법 및 기간을 설정       | 캐시 유효성 검증 판단 기준 값  |      `Etag`와 동일      |
|  값  | `max-age`, `no-cache`, `no-store` 등 | 특정 버전의 리소스 고유 식별자 | 리소스의 최종 수정 시각 |

_HTTP 캐싱 관련 응답 헤더_

<br>

</div>

현재 프로젝트에서 구현한 서버는 Express 내부적으로 `Etag` 비교 방식을 활용하여 HTTP 캐싱을 효율적으로 관리하고 있었습니다.

<div align="center">

<img width="800" alt="스니펫 스크립트 로드 응답 헤더 이미지" src="https://github.com/user-attachments/assets/00a522ff-8cc3-4db9-a74a-fcde97c4ac48">

_스니펫 스크립트 로드 응답 헤더_

<br>

</div>

`Etag` 비교 방식에서 브라우저는 응답 헤더에 `Etag`가 포함되어 있을 경우 HTTP 캐싱 과정에서 리소스와 `Etag`를 저장합니다.

이 후 동일한 후속 요청에 캐싱된 리소스 상태가 유효하지 않다면 캐시 관련 헤더 `If-Not-Match`를 포함한 조건부 요청을 보냅니다.

<div align="center">

<img width="800" alt="If-Not-Match 헤더를 포함한 조건부 요청 이미지" src="https://github.com/user-attachments/assets/1db4047c-2a5e-4080-a421-0e1ea4ef00c2">

_If-Not-Match 헤더를 포함한 조건부 요청_

<br>

</div>

조건부 요청을 받은 서버는 다음과 같은 유효성 검사 과정이 진행됩니다.

<div align="center">

<img width="800" alt="Etag 비교 방식 유효성 검사 과정 이미지" src="https://github.com/user-attachments/assets/a45065f8-5ddb-45eb-bfd4-1c18126384c1">

_Etag 비교 방식 유효성 검사 과정_

<br>

</div>

이러한 Etag 비교 방식은 사용자의 웹 프로젝트 성능을 유지하면서 정확한 테스트 결과를 얻기 위해 스니펫 스크립트를 최신 상태로 유지해야 하는 상황에 적합하여 Express의 Etag 비교 방식을 활용하고자 하였습니다.

이를 통해 사용자의 웹 프로젝트 성능 유지와 최적화하여 서비스 사용자의 웹 프로젝트의 영향을 최소화할 수 있었습니다.

<br>
