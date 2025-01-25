import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";


export default function Faq() {
  return (
    <div className="flex flex-col gap-9 bg-text-button md:p-6 p-3">
        <div className="flex items-center justify-center">
            <h1 className="md:text-3xl text-xl font-bold text-content-day">Frequently Asked Questions</h1>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="md:text-xl  font-semibold">General</h2>
            <Accordion type="single" collapsible className="">
                 <AccordionItem value="item-1" className="border-b-outline-day">
                   <AccordionTrigger className="">What is Infinity Thrift Credit and Investment Limited</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2" className="border-b-outline-day">
                   <AccordionTrigger>How do i qualify for a loan?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-3" className="border-b-outline-day">
                   <AccordionTrigger>How do i sign up?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-4" className="border-b-outline-day">
                   <AccordionTrigger>What saving plans are available?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-5" className="border-b-outline-day">
                   <AccordionTrigger>Can I withdrw my savings at any time?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-6" className="border-b-outline-day">
                   <AccordionTrigger>Is my personal Informatin safe?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="md:text-xl font-semibold">Savings</h2>
            <Accordion type="single" collapsible>
                 <AccordionItem value="item-1" className="border-b-outline-day">
                   <AccordionTrigger className="">What saving plans are available?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2" className="border-b-outline-day">
                   <AccordionTrigger>Can I withdraw my savings at any time?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="md:text-xl font-semibold">Loans</h2>
            <Accordion type="single" collapsible>
                 <AccordionItem value="item-1" className="border-b-outline-day">
                   <AccordionTrigger className="">How do I qualify for a loan?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2" className="border-b-outline-day">
                   <AccordionTrigger>What is the loan repayment process?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="md:text-xl font-semibold">Registrations</h2>
            <Accordion type="single" collapsible>
                 <AccordionItem value="item-1" className="border-b-outline-day">
                   <AccordionTrigger className="">How do I sign up?</AccordionTrigger>
                   <AccordionContent className="bg-active-nav p-2">
                     Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
        </div>
    </div>
  )
}
