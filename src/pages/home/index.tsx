import MainLayout from '../../components/layouts/main'

const HomePage = () => {
  return (
    <>
      <h4 className="m-1">Giới thiệu</h4>
      <hr />
      <h2 className="text-orange-500 text-center text-size-20 ">GIỚI THIỆU</h2>
      <h4 className="text-orange-500 m-3 mt-5">Cách tính công trong tháng</h4>
      <div className="m-3">
        <p className="ml-10">
          - Đi muộn: là trường hợp đi muộn hơn giờ quy định sau 08h00 buổi sáng
          và 13h00 buổi chiều.
        </p>
        <p className="ml-10">
          - Về sớm: là trường hợp về sớm trước 12h00 buổi sáng và 17h00 buổi
          chiều.
        </p>
        <p className="ml-10">
          - Nghỉ giữa giờ: là trường hợp xin nghỉ trong giờ làm việc.
        </p>
        <p className="ml-10">
          - Chấm công vân tay: để chấm công xác nhận giờ làm việc của Nhân viên.
        </p>{' '}
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
      <h4 className="text-orange-500 m-3 mt-5">Thời gian làm việc</h4>
      <p className="ml-10">
        {' '}
        - Thời gian làm việc: Buổi sáng 08h00 - 12h00, buổi chiều 13h00 - 17h00
        từ thứ Hai đến thứ Sáu, nghỉ thứ Bảy, Chủ nhật.
      </p>
      <p className="ml-10">- Số giờ làm việc trong ngày: 08 tiếng. </p>
      <p className="ml-10">- Thời gian nghỉ trưa: 12:00 - 13:00.</p>
      <h4 className="text-orange-500 m-3 mt-5">Chế độ của Công ty:</h4>
      <p className="ml-10">
        - Hưởng lương tháng thứ 13 tuỳ theo tình hình kinh doanh của Công ty.{' '}
      </p>
      <p className="ml-10">
        - Hưởng mọi quyền lợi nghỉ lễ/ tết kèm theo thưởng ngày lễ/ tết trong
        năm theo quy định Công ty.
      </p>{' '}
      <p className="ml-10">
        - Review lương 2 lần/năm định kỳ vào tháng 6 và tháng 12 hàng năm.{' '}
      </p>
      <p className="ml-10">- Du lịch 1 lần/năm. </p>
      <p className="ml-10">- Team building định kỳ hàng quý.</p>
      <h4 className="text-orange-500 m-3 mt-5">QUY TRÌNH THANH TOÁN LƯƠNG</h4>
      <p className="ml-10">
        1. Gửi bảng chấm công Từ ngày 01 - 05 hằng tháng, Bộ phận nhân sự sẽ gửi
        bảng chấm công tháng trước cho Nhân viên. Nhân viên tự kiểm tra lại ngày
        công của mình, nếu có sai sót cần báo lại Bộ phận nhân sự để điều chỉnh.
      </p>
      <p className="ml-10">
        2. Gửi phiếu lương Ngày 09 hoặc 10 hàng tháng, Bộ phận kế toán sẽ gửi
        phiếu lương đến Nhân viên.{' '}
      </p>{' '}
      <p className="ml-10">
        3. Thanh toán lương Thời điểm trả lương: ngày 10 hàng tháng. Trường hợp
        thời điểm trả lương trùng ngày lễ, ngày nghỉ theo quy định thì được trả
        vào ngày làm việc tiếp theo.
      </p>
    </>
  )
}

export default HomePage
