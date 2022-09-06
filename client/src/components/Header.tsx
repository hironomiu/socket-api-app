import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { isLoginAtom } from '../recoil'
import SignOutModal from './modal/SignOutModal'

const Header = () => {
  const isLogin = useRecoilValue(isLoginAtom)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOn, setIsModalOn] = useState(false)
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev)
  }
  const handleClickSignOut = async () => {
    setIsModalOn(true)
  }
  return (
    <header className=" h-16 flex justify-between items-center mx-4">
      <div className="text-2xl">Header</div>
      {isLogin ? (
        <>
          <nav>
            <ul className="md:flex space-x-2 hidden">
              <li>hoge</li>
              <li>fuga</li>
              <li>piyo</li>
              <li onClick={handleClickSignOut} className="hover:cursor-pointer">
                SignOut
              </li>
            </ul>
          </nav>
          <div className="block md:hidden">
            {isMenuOpen ? (
              <AiOutlineClose onClick={handleClick} />
            ) : (
              <AiOutlineMenu onClick={handleClick} />
            )}
          </div>
          <div
            className={
              isMenuOpen
                ? 'md:hidden fixed top-0 left-0 h-full w-[60%] bg-white ease-in-out duration-500 pl-4'
                : 'fixed left-[-150px] top-0 h-full ease-in-out duration-1000'
            }
          >
            <h1 className="text-2xl mt-4 mb-2">SideMenu</h1>
            <ul className="">
              <li className="text-xl my-2">hoge</li>
              <li className="text-xl my-2">fuga</li>
              <li className="text-xl my-2">piyo</li>
              <li className="text-xl my-2 hover:cursor-pointer">SignOut</li>
            </ul>
          </div>
          {/* TODO: スマホ時のモーダルデザイン */}
          {isModalOn ? <SignOutModal setIsModalOn={setIsModalOn} /> : null}
        </>
      ) : (
        ''
      )}
    </header>
  )
}

export default Header
