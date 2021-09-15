import Link from 'next/link'

export default function Banner() {
  return (
    <div className="banner">
      <Link href="/">
        <a>
          <div className="banner_textbox">
            <div className="banner_animation_display">
              <div className="banner_list">
                <div className="banner_list_item">CHŪKO</div>
                <div className="banner_list_item">中古</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div >
  )
}