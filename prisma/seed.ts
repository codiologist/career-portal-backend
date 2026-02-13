import { PrismaClient, AddressTypeEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Address Types...');

  await prisma.addressType.createMany({
    data: [
      { name: AddressTypeEnum.PRESENT },
      { name: AddressTypeEnum.PERMANENT },
    ],
    skipDuplicates: true, // duplicate হলে error দিবে না
  });

  console.log('✅ Address Types Seeded Successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
