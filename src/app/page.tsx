import ButtonGoogle from "@/app/(auth)/Login/button-google";

import ButtonRegister from "@/app/(auth)/Register/button-register";
import ButtonLogin from "./(auth)/Login/button-login";
import Link from "next/link";

const getGoogleAuthUrl = () => {
  const { NEXT_PUBLIC_GOOGLE_CLIENT_ID, NEXT_GOOGLE_AUTHORIZED_REDIRECT_URI } =
    process.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const query = {
    client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: NEXT_GOOGLE_AUTHORIZED_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
const googleOAuthUrl = getGoogleAuthUrl();

export default function Home() {
  return (
    <main className="flex justify-around items-center h-screen">
      <div className="flex md:justify-between h-[100vh] items-center p-32  flex-col md:flex-row">
        <div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className=" h-[3rem] md:h-[50vh]"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </g>
          </svg>
        </div>

        <div className="ml-28 justify-center min-w-[100%] md:min-w-[45vw] md:p-4">
          <div className="min-w-[437px] max-w-[760px] w-full p-5 ">
            <div className="md:leading-[84px] md:tracking-[-1.2px] font-bold t my-12">
              <span className="text-6xl">Các hoạt động đang diễn ra</span>
            </div>
            <div className="mb-8 text-3xl font-bold">
              <span>Tham gia ngay.</span>
            </div>
            <div>
              <Link href={googleOAuthUrl}>
                <ButtonGoogle />
              </Link>

              <div className="flex items-center w-full">
                <div className="h-[1px] w-full bg-slate-400"></div>
                <div className="px-4 py-4">hoặc</div>
                <div className="h-[1px] w-full bg-slate-400"></div>
              </div>
              <ButtonRegister />
            </div>
            <div className="mt-10">
              <span className="font-bold text-lg">Đã có tài khoản?</span>
              <ButtonLogin />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
