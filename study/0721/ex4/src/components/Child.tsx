import React from "react";

const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("자식 컴포넌트 렌더링");
  return (
    <button onClick={onClick} className="btn btn-warning">
      자식 버튼 클릭
    </button>
  );
});

export default Child;
