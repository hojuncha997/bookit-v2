class APIFilters {
  query: any; // 몽구스 모델을 받을 변수: 몽구스는 몽고디비의 네이티브 드라이버를 추상화하고 모델을 정의할 때 자동으로 쿼리 메서드를 제공한다.(find, findOne, update 등)
  queryStr: any; // 쿼리 문자열을 받을 변수

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFilters {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location, // 검색 시 정규식 사용
            $options: "i",
          },
        }
      : {};

    // query가 몽구스 모델의 인스턴스이므로 몽구스의 쿼리 빌더 체인을 사용할 수 있다. 그리고 결과로 받은 쿼리를 다시 query에 할당한다.
    // 그러나 이 시점에서 쿼리가 실행되는 것은 아니다. 몽구스에서는 효율성을 위해 lazy execution 방식을 사용한다.
    //  쿼리는 이 쿼리를 호출한 함수에서 awiat를 사용해 실행한다. e.g. const rooms: IRoom[] = await apiFilters.query;
    //  이러한 이유로 최초에 모델을 할당하는 변수의 이름이 query인 것이다. query에 담긴 모델을 사용해 쿼리를 만들고 그것을 자신에게 재할당 하기 때문이다.
    this.query = this.query.find({ ...location });
    return this;
  }
}

export default APIFilters;
