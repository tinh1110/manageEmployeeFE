import MainLayout from '../../components/layouts/main'

const HomePage = () => {
  return (
    <>
      <h4 className="m-1">Giới thiệu</h4>
      <hr />
      <h2 className="text-orange-500 text-center text-size-20 ">GIỚI THIỆU</h2>
      <h4 className="text-orange-500 m-3 mt-5">Cách tính công trong tháng</h4>
      <div className="m-3">
        Thời gian đi muộn về sớm nghỉ giữa giờ sẽ tính theo đơn vị 15 phút và sẽ
        trừ trực tiếp vào ngày phép. Nếu nhân viên đã dùng hết ngày phép thì sẽ
        trừ trực tiếp vào ngày công. Đơn vị 15 phút được tính như sau:
        <p className="ml-10">Dưới 15 phút: Chuyển đổi thành 15 phút.</p>
        <p className="ml-10">
          {' '}
          Từ phút thứ 16 đến phút thứ 30: Chuyển đổi thành 30 phút.{' '}
        </p>
        <p className="ml-10">
          Từ phút thứ 31 đến phút thứ 45: Chuyển đổi thành 45 phút.{' '}
        </p>
        <p className="ml-10">
          Từ phút thứ 46 đến phút thứ 60: Chuyển đổi thành 60 phút.
        </p>
        1 năm nhân viên có 12 ngày phép cho 12 tháng.
      </div>
      <h4 className="text-orange-500 m-3 mt-5">Giới thiệu</h4>
      <div className="m-3">
        Học viện Công nghệ Bưu chính Viễn thông thành lập theo quyết định số
        516/TTg của Thủ tướng Chính phủ ngày 11 tháng 7 năm 1997 trên cơ sở sắp
        xếp lại 4 đơn vị thành viên thuộc Tổng Công ty Bưu chính Viễn thông Việt
        Nam, nay là Tập đoàn Bưu chính Viễn thông Việt Nam là Viện Khoa học Kỹ
        thuật Bưu điện, Viện Kinh tế Bưu điện, Trung tâm đào tạo Bưu chính Viễn
        thông 1 và 2. Các đơn vị tiền thân của Học viện là những đơn vị có bề
        dày lịch sử hình thành và phát triển với xuất phát điểm từ Trường Đại
        học Bưu điện 1953.
      </div>
      <div className=" m-3 mt-5 ">
        Từ ngày 1/7/2014, thực hiện Quyết định của Thủ tướng Chính phủ, Bộ
        trưởng Bộ Thông tin và Truyền thông đã ban hành Quyết định số
        878/QĐ-BTTTT điều chuyển quyền quản lý Học viện từ Tập đoàn Bưu chính
        Viễn thông Việt Nam về Bộ Thông tin và Truyền thông. Học viện Công nghệ
        Bưu chính Viễn thông là đơn vị sự nghiệp trực thuộc Bộ. Là trường đại
        học, đơn vị nghiên cứu, phát triển nguồn nhân lực trọng điểm của Ngành
        thông tin và truyền thông.
      </div>
      <div className=" m-3 mt-5 ">
        Với vị thế là đơn vị đào tạo, nghiên cứu trọng điểm, chủ lực của Ngành
        thông tin và truyền thông Việt Nam, là trường đại học trọng điểm quốc
        gia trong lĩnh vực ICT, những thành tựu trong gắn kết giữa Nghiên cứu –
        Đào tạo – Sản xuất kinh doanh năng lực, quy mô phát triển của Học viện
        hôm nay, Học viện sẽ có những đóng góp hiệu quả phục vụ sự phát triển
        chung của Ngành Thông tin và truyền thông và sự nghiệp xây dựng, bảo vệ
        tổ quốc, góp phần để đất nước, để Ngành Thông tin và truyền thông Việt
        Nam có sự tự chủ, độc lập về khoa học công nghệ và nguồn nhân lực, qua
        đó tự tin cạnh tranh với các đối thủ lớn và sánh vai với các cường quốc
        trên thế giới.
      </div>
      <h4 className="text-orange-500 m-3 mt-5">Chức năng và nhiệm vụ</h4>
      <div className="flex items-center justify-center">
        <img
          alt=""
          className="text-center w-[500px] h-[300px]"
          src="https://portal.ptit.edu.vn/wp-content/uploads/2016/04/hocvienHQV.jpg"
        ></img>
      </div>
      <div className=" m-3 mt-5 ">
        Học viện Công nghệ Bưu chính – Viễn thông là đơn vị sự nghiệp trực thuộc
        Bộ Thông tin và truyền thông, Học viện thực hiện hai chức năng cơ bản:
        Giáo dục, đào tạo cho xã hội và cho nhu cầu của Ngành thông tin và
        truyền thông Việt Nam. Nghiên cứu khoa học, tư vấn, chuyển giao công
        nghệ trong lĩnh vực Bưu chính, Viễn thông và công nghệ thông tin đáp ứng
        nhu cầu xã hội và nhu cầu của Ngành thông tin và truyền thông Việt Nam.
      </div>
      <h4 className="text-orange-500 m-3 mt-5">Đào tạo</h4>
      <div className=" m-3 mt-5 ">
        Hệ thống đào tạo và cấp bằng của Học viện bao gồm nhiều cấp độ tuỳ thuộc
        vào thời gian đào tạo và chất lượng đầu vào của các học viên. Hiện nay
        Học viện cung cấp các dịch vụ giáo dục, đào tạo chủ yếu sau đây: Thực
        hiện các khoá đào tạo bậc Cao đẳng, Đại học, Thạc sĩ và Tiến sĩ theo
        chương trình chuẩn quốc gia và quốc tế theo các hình thức khác nhau như
        tập trung, phi tập trung, liên thông, đào tạo từ xa… Tổ chức các khoá
        đào tạo bồi dưỡng ngắn hạn cấp chứng chỉ trong các lĩnh vực Bưu chính,
        Viễn thông, công nghệ thông tin, quản trị kinh doanh, an toàn thông tin,
        công nghệ đa phương tiện… Tổ chức các chương trình đào tạo cho nước thứ
        ba. Sẵn sàng liên danh, liên kết với các đối tác trong nước và quốc tế
        trong lĩnh vực giáo dục, đào tạo.
      </div>
      <h4 className="text-orange-500 m-3 mt-5">
        Nghiên cứu khoa học và tư vấn chuyển giao công nghệ
      </h4>
      <div className=" m-3 mt-5 ">
        Tổ chức nghiên cứu về chiến lược, quy hoạch phát triển mạng và dịch vụ
        bưu chính, viễn thông và công nghệ thông tin. Tổ chức nghiên cứu về công
        nghệ, giải pháp và phát triển dịch vụ trong lĩnh vực bưu chính, viễn
        thông và công nghệ thông tin. Tổ chức nghiên cứu và phát triển các sản
        phẩm, bán sản phẩm trong lĩnh vực điện tử – viễn thông. Tổ chức nghiên
        cứu về quản lý, điều hành doanh nghiệp và các lĩnh vực kinh tế khác.
        Cung cấp các dịch vụ tư vấn về công nghệ, giải pháp và phát triển dịch
        vụ trong lĩnh vực bưu chính, viễn thông, công nghệ thông tin và lĩnh vực
        kinh tế cho các đơn vị trong và ngoài Ngành thông tin và truyền thông
        Việt Nam. Cung cấp các dịch vụ đo lường, kiểm chuẩn, tư vấn thẩm định
        các công trình, dự án thuộc lĩnh vực bưu chính viễn thông và công nghệ
        thông tin..
      </div>
    </>
  )
}

export default HomePage
