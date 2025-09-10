"use client";

import Script from "next/script";
import { CRISP_WEBSITE_ID } from "@/lib/crisp";

const CrispChat = () => {

  return (
    <>
      {CRISP_WEBSITE_ID ? (
        <Script
          id="crisp-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
              (function() {
                d = document;
                s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      ) : null}
    </>
  );
};

export default CrispChat;
