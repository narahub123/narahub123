export const Card = () => {
  return (
    <div className="w-[300px] border-2 border-black rounded-lg flex items-center flex-col p-4">
      <div className="flex justify-center mb-12">
        <img
          src="https://file.mk.co.kr/meet/yonhap/2021/05/30/image_readtop_2021_518799_0_135812.jpg"
          alt="자동자 이미지"
          className="w-[80%]"
        />
      </div>
      <p className="font-bold">홍길동</p>
      <p className="text-blue-400">Frontend Developer</p>
      <p className="mt-2 text-sm">React와 Tailind를 배우는 중입니다.</p>
    </div>
  );
};
