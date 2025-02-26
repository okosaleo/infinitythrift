"use client";
import { useState, useEffect, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, EllipsisVertical, Eye, ListFilter, Loader2, Plus, Search, Upload } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Link from 'next/link';

// Define the types if they are not imported from elsewhere
type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
type LoanStatus = 'APPROVED' | 'ACTIVE' | 'PAID' | 'DEFAULTED';

interface User {
  id: string;
  name: string;
  email: string;
  banned: boolean;
  createdAt: string;
  kyc?: {
    status: KYCStatus;
  };
  wallet?: {
    balance: number;
  };
  thriftSavings: {
    currentAmount: number;
  }[];
  structuredSavings: {
    currentAmount: number;
  }[];
  loans: {
    amount: number;
    status: LoanStatus;
  }[];
}

type FilterType = 'all' | 'active' | 'inactive' | 'verified' | 'unverified' | 'new';

export default function Members() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user?page=${currentPage}&pageSize=${pageSize}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (!result.success || !result.data) throw new Error(result.error || 'Failed to fetch users');
        
        setUsers(result.data.users);
        setTotalUsers(result.data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  // Filter users based on selected filter
  const filterCounts = useMemo(() => ({
    all: totalUsers,
    active: users.filter(user => !user.banned).length,
    inactive: users.filter(user => user.banned).length,
    verified: users.filter(user => user.kyc?.status === 'APPROVED').length,
    unverified: users.filter(user => !user.kyc || user.kyc.status !== 'APPROVED').length,
    new: users.filter(user => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(user.createdAt) > sevenDaysAgo;
    }).length,
  }), [users, totalUsers]);

  const getButtonClass = (filter: FilterType) =>
    `p-2 rounded-2xl text-sm transition-colors ${
      selectedFilter === filter
        ? 'bg-gradient-to-r from-hover-btn to-[#2e1905] text-text-button'
        : 'bg-[#eaecec] text-[#6c6c6c] hover:bg-gradient-to-r hover:from-hover-btn hover:to-[#2e1905] hover:text-text-button'
    }`;

  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <p className='text-content-day text-xl'>Loading</p>
      <Loader2 className='animate-spin size-8 text-primary-active' />
    </div>
  );
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-2">
       <div className="border-b-[1px] bg-[#f7f8f8] border-b-outline-day h-16 w-full flex items-center justify-between px-7">
          <h1 className="text-2xl font-semi-bold text-content-day">Members</h1>
          <div className='flex gap-4 items-center justify-center'>
            <Upload className='size-6 text-icon-day' />
            <Search className='size-6 text-icon-day' />
            <ListFilter className='size-6 text-icon-day' />
            <Link href="/admin/dashboard/settings/userman" className='p-2 flex items-center bg-primary-active gap-2 rounded-md'>
              <Plus className='size-4 text-text-button' />
              <p className='text-sm text-text-button'>Create New Member</p>
            </Link>
          </div>
       </div>

       <div className='flex flex-row gap-6 items-center mt-5 ml-5'>
         <button onClick={() => setSelectedFilter('all')} className={getButtonClass('all')}>
          All({filterCounts.all})
         </button>
         <button onClick={() => setSelectedFilter('active')} className={getButtonClass('active')}>
          Active ({filterCounts.active})
         </button>
         <button onClick={() => setSelectedFilter('inactive')} className={getButtonClass('inactive')}>
          Inactive ({filterCounts.inactive})
         </button>
         <button onClick={() => setSelectedFilter('verified')} className={getButtonClass('verified')}>
          Verified ({filterCounts.verified})
         </button>
         <button onClick={() => setSelectedFilter('unverified')} className={getButtonClass('unverified')}>
          Unverified ({filterCounts.unverified})
         </button>
         <button onClick={() => setSelectedFilter('new')} className={getButtonClass('new')}>
          New Members ({filterCounts.new})
         </button>
       </div>

       {/* Users Table */}
       <div className="px-5 mt-4">
         <div className="rounded-md overflow-x-auto">
           <Table className="w-full [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
             <TableHeader className='bg-[#f7f8f8]'>
               <TableRow>
                 <TableHead className="w-[100px] text-2">Membership ID #</TableHead>
                 <TableHead>Name</TableHead>
                 <TableHead>Primary Wallet</TableHead>
                 <TableHead className="text-right">Thrift Savings</TableHead>
                 <TableHead className="text-right">Structured savings</TableHead>
                 <TableHead className="text-right">Total Loans</TableHead>
                 <TableHead className="text-right">Signed Up</TableHead>
               </TableRow>
             </TableHeader>
            
             <TableBody>
               {loading ? (
                 <TableRow>
                   <TableCell colSpan={7} className="text-center">
                     Loading...
                   </TableCell>
                 </TableRow>
               ) : users.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={7} className="text-center">
                     No members found
                   </TableCell>
                 </TableRow>
               ) : (
                 users.map((item) => (
                   <TableRow key={item.id}>
                     <TableCell className="font-medium">{item.id.slice(0, 8)}</TableCell>
                     <TableCell>{item.name}</TableCell>
                     <TableCell>₦{(item.wallet?.balance || 0).toLocaleString('en-NG')}</TableCell>
                     <TableCell className="text-right">
              ₦{item.thriftSavings
                .reduce((sum, s) => sum + Number(s.currentAmount), 0)
                .toLocaleString('en-NG')}
            </TableCell>
            <TableCell className="text-right">
              ₦{item.structuredSavings
                .reduce((sum, s) => sum + Number(s.currentAmount), 0)
                .toLocaleString('en-NG')}
            </TableCell>
            <TableCell className="text-right">
              ₦{item.loans
                .filter(loan => ['APPROVED', 'ACTIVE', 'PAID', 'DEFAULTED'].includes(loan.status))
                .reduce((sum, loan) => sum + Number(loan.amount), 0)
                .toLocaleString('en-NG')}
            </TableCell>
                     <TableCell className='flex flex-row gap-3 items-center justify-end'>
                       {new Date(item.createdAt).toLocaleDateString('en-GB')}
                       <DropdownMenu>
                         <DropdownMenuTrigger>
                           <EllipsisVertical className='size-5' />
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className='border-0 w-36 mr-3'>
                           <DropdownMenuItem>
                             <div className='flex flex-row gap-2 items-center'>
                               <Eye className='size-4' />
                               <Link href={`/admin/dashboard/members/profile/${item.id}`}>View Profile</Link>
                             </div>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                             <div className='flex flex-row gap-2 items-center text-destructive-day'>
                               <Ban className='size-4' />
                               <Link href="/">Deactivate</Link>
                             </div>
                           </DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                     </TableCell>
                   </TableRow>
                 ))
               )}
               {error && (
                 <TableRow>
                   <TableCell colSpan={7} className="text-center text-red-500">
                     Error: {error}
                   </TableCell>
                 </TableRow>
               )}
             </TableBody>
           </Table>
         </div>
         <div className="mt-4 flex justify-start">
           <Pagination>
             <PaginationContent>
               <PaginationItem>
                 <PaginationPrevious
                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                   aria-disabled={currentPage === 1}
                 />
               </PaginationItem>
               
               {Array.from({ length: totalPages }, (_, i) => (
                 <PaginationItem key={i + 1}>
                   <PaginationLink className='bg-primary-day text-text-button'
                     isActive={currentPage === i + 1}
                     onClick={() => setCurrentPage(i + 1)}
                   >
                     {i + 1}
                   </PaginationLink>
                 </PaginationItem>
               ))}
   
               <PaginationItem>
                 <PaginationNext
                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                   aria-disabled={currentPage === totalPages}
                 />
               </PaginationItem>
             </PaginationContent>
           </Pagination>
         </div>
       </div>
    </div>
  );
}
