import ForbiddenError from '@/features/errors/components/forbidden'
import GeneralError from '@/features/errors/components/general-error'
import MaintenanceError from '@/features/errors/components/maintenance-error'
import NotFoundError from '@/features/errors/components/not-found-error'
import UnauthorisedError from '@/features/errors/components/unauthorized-error'

export const metadata = {
   title: 'Dashboard : Error view',
}

export default async function Page({
   params,
}: {
   params: Promise<{ slug: string }>
}) {
   const { slug } = await params
   switch (slug) {
      case 'forbidden':
         return <ForbiddenError />
      case 'unauthorized':
         return <UnauthorisedError />
      case 'not-found':
         return <NotFoundError />
      case 'maintenance':
         return <MaintenanceError />
      case 'general':
         return <GeneralError />
   }
}
