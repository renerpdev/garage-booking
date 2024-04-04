export const Footer = () => (
  <div className={"bg-gray-50 w-100 h-auto mt-auto py-2 md:py-3 px-5 text-black border-t-2 border-t-gray-50"}>
    <div className={"flex justify-center items-center"}>
      <div className={"text-sm"}>
        <a href="https://renerp.dev" target="_blank" rel="noopener" className={"font-semibold hover:text-primary"}>
          renerp.dev
        </a>{" "}
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  </div>
)
