import Image from "next/image";


export default function Header() {
  return (
    <div className="flex flex-col w-full">
        <div className="flex flex-col px-12 w-full">-
        <div className="flex items-center justify-center text-3xl text-content-day">
            <h1>About</h1>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center gap-4 py-6">
            <div >
                 <Image src="/img/infi.png" alt="Infi IMage" width={407} height={408} />
            </div>
            <div className="w-full flex flex-col gap-1 md:text-base text-sm">
            <p> 
            <strong>Infinity Thrift and Credit Investment Limited</strong> is a cooperative thrift and Investment company founded in 2024, with its head office in Kubwa, Abuja.</p>
 <p>
<strong>Infinity Thrift and Credit Investment Limited</strong> with <strong>RC-7242226</strong> is a limited liability company duly incorporated with the Corporate Affairs Commission (CAC) in Nigeria under the 2002 Companies and Allied Matters Act. </p>
<p>
<strong>At Infinity Thrift and Credit Investment Limited,</strong> we believe in the power of community, mutual support, and financial empowerment. Our cooperative was established to provide individuals and families who are our members with an affordable and sustainable way to meet their financial goals. Whether you're saving for the future, borrowing to meet urgent needs, or looking to grow your financial literacy, we are here to support you every step of the way.</p>
<p>
<strong>Infinity Thrift and Credit Investment Limited</strong> is committed to its mission to foster a culture of savings among its members and to encourage responsible borrowing for members by providing low interest loans, and empower our members to achieve financial independence. We are committed to providing accessible and fair financial services, focusing on the needs of our members.
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}
