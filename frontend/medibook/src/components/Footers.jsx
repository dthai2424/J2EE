"use client";
import logo from "../assets/logo_new.png";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

export function Footers() {
  return (
    <Footer container className=" w-full p-10 !bg-white ">
      <div className="w-full ">
        <div className="grid-cols-2  gap-100 w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="https://flowbite.com"
              src={logo}
              alt="Flowbite Logo"
              name="Flowbite"
            />
          </div>
          <div className="w-full flex sm:items-center sm:justify-between text-left">
            <div>
              <FooterTitle title="Hỗ trợ" className="!text-lg  " />
              <FooterLinkGroup col>
                <FooterLink href="/faq" className="!text-lg  ">
                  Câu hỏi thường gặp
                </FooterLink>
                <FooterLink href="/guides" className="!text-lg  ">
                  Hướng dẫn đặt lịch
                </FooterLink>
                <FooterLink
                  href="mailto:support@medibook.vn"
                  className="!text-lg  "
                >
                  Email: support@medibook.vn
                </FooterLink>
                <FooterLink href="tel:19000000" className="!text-lg  ">
                  Hotline: 1900.0000
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Về MediBook" className="!text-lg  " />
              <FooterLinkGroup col>
                <FooterLink href="/about-us" className="!text-lg  ">
                  Giới thiệu về MediBook
                </FooterLink>
                <FooterLink href="/terms-of-service" className="!text-lg  ">
                  Điều khoản sử dụng
                </FooterLink>
                <FooterLink href="/privacy-policy" className="!text-lg  ">
                  Chính sách bảo mật
                </FooterLink>
                <FooterLink href="/regulations" className="!text-lg  ">
                  Quy chế hoạt động
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Dành cho Đối tác" className="!text-lg  " />
              <FooterLinkGroup col>
                <FooterLink href="/partner/clinic" className="!text-lg  ">
                  Hợp tác phòng khám
                </FooterLink>
                <FooterLink href="/partner/doctor" className="!text-lg  ">
                  Hợp tác bác sĩ
                </FooterLink>
                {/* (Link này trỏ đến trang đăng nhập cho admin/doctor) */}
                <FooterLink href="/login-partner" className="!text-lg  ">
                  Đăng nhập cho đối tác
                </FooterLink>
                <FooterLink href="/login-partner" className="!text-lg  ">
                  Quảng cáo
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
      </div>
    </Footer>
  );
}
