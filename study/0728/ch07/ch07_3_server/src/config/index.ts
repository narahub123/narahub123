import path from "path";

//proces.cwd():  프로젝트의 package.json() 파일이 있는 디렉터리의 절대 경로를 반환해줌
export const getPublicDirPath = () => path.join(process.cwd(), "public");
