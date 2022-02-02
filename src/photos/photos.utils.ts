export const parsingHashtags = (caption: string) => {
  /**
   * TODO: parse caption 게시글에서 해시태그 파싱하기
   * 정규표현식 테스트 사이트 https://www.regexpal.com/
   */
  // 정규표현식을 통해 태그들을 배열로 추출해낸다.
  //해시태그가 없다면 null 값이므로 [] 대입
  const hashtags = caption.match(/#[\ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]+/g) || [];
  /**
   * TODO: 해시태그 생성 or 추가
   * 원래 방식대로라면 배열의 모든 요소들에 접근하여
   * 존재하는지 체크하고
   * 존재한다면 값을 추가하고,
   * 존재하지 않는다면 새로 항목을 만들어야 한다.
   *
   * 다행히도 이런 귀찮은 작업들을 대신 해주는
   * connectOrCreate 함수가 prisma에 존재한다.
   */

  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
  /**
   * map함수로 객체배열 생성
   * [
   *   {
   *     where: { hashtag: "#food" },
   *     create: { hashtag: "#food" },
   *   }
   * ]
   */
};
