import { useTranslations } from "next-intl"

export const Footer = () => {
  const t = useTranslations("Footer")

  return (
    <div className={"bg-gray-50 w-100 h-auto mt-auto py-4 px-5 text-black border-t-2 border-t-gray-50"}>
      <div className={"flex justify-center items-center text-center"}>
        <div className={"text-sm"}>
          <a
            href="https://portfolio.renerp.dev"
            target="_blank"
            rel="noopener"
            className={"font-semibold hover:text-primary"}>
            renerp.dev
          </a>{" "}
          <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        </div>
      </div>
    </div>
  )
}
