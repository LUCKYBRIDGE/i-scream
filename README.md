# 교실에서 바로 쓰는 웹 도구

아이스크림 제출용 웹 포트폴리오. 놀평어로 교무 업무를, 놀아트와 놀프린트로 작품 제작과 출력을, 놀퀴즈와 살아남기 시리즈로 학습 게임과 모둠 토의를 소개합니다.

| 파일 | 용도 |
| --- | --- |
| [Canva 편집용 PowerPoint](deliverables/knol-portfolio.pptx) | Canva에 가져와 텍스트·레이아웃 편집 |
| [검토용 PDF](deliverables/knol-portfolio.pdf) | 9장 전체 시안 검토 |
| [슬라이드 원고](docs/slides.json) | 제목·본문·캡션·공개 링크 수정 |
| [Canva 제작 지침](docs/canva-guide.md) | 디자인, 카피, 가져오기 및 제출 검수 |
| [캡처 출처와 근거](docs/evidence.md) | 캡처 출처와 주장별 확인 범위 |
| [화면 캡처](assets/screenshots/) | 슬라이드 교체용 원본 |
| [슬라이드 생성 코드](scripts/build-deck.cjs) | 원고와 캡처로 PPTX 재생성 |

## 공개 서비스

- [놀평어](https://record.knolquiz.com/)
- [놀아트](https://art.knolquiz.com/) · [놀프린트](https://print.knolquiz.com/)
- [놀퀴즈](https://knolquiz.com/) · [위인 점프맵](https://luckybridge.github.io/knol-jump/)
- [살아남기 시리즈](https://luckybridge.github.io/survival-conversation/) · [바다에서 살아남기](https://luckybridge.github.io/sea-survival-for-class/)

Node.js에서 `pptxgenjs`를 설치한 뒤 `node scripts/build-deck.cjs`를 실행하면 원고와 캡처를 바탕으로 PPTX를 다시 만들 수 있습니다. PDF는 PPTX를 열어 내보냅니다.
