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

  
  console.log('🌱 Seeding Education data Types...');
  // 1. Result Types (Standard in BD)
  const resultTypes = [
    { name: 'GPA (out of 5.0)' },
    { name: 'CGPA (out of 4.0)' },
    { name: 'First Division' },
    { name: 'Second Division' },
    { name: 'Pass' },
  ];

  for (const type of resultTypes) {
    await prisma.resultType.upsert({
      where: { resultType: type.name },
      update: {},
      create: { resultType: type.name },
    });
  }

  // 2. Education Boards (Bangladesh)
  const boards = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Jessore', 'Barisal',
    'Sylhet', 'Comilla', 'Dinajpur', 'Mymensingh', 'Madrasah', 'Technical'
  ];

  for (const board of boards) {
    await prisma.educationBoard.upsert({
      where: { boardName: board },
      update: {},
      create: { boardName: board },
    });
  }

  // 3. Major Groups (SSC/HSC level)
  const groups = ['Science', 'Commerce', 'Arts', 'Vocational', 'Humanities'];
  for (const group of groups) {
    await prisma.majorGroup.upsert({
      where: { groupName: group },
      update: {},
      create: { groupName: group },
    });
  }

  // 4. Subjects (Commonly used in BD Universities/Colleges)
  const subjects = [
    'Computer Science & Engineering', 'Electrical & Electronic Engineering',
    'BBA', 'Accounting', 'English', 'Economics', 'Physics', 'Mathematics'
  ];
  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { subjectName: subject },
      update: {},
      create: { subjectName: subject },
    });
  }

  // 5. Levels and Degrees (The Core Hierarchy)
  // We define them together to link Degree -> Level
  const educationHierarchy = [
    {
      level: 'Secondary (SSC)',
      degrees: ['SSC', 'Dakhil', 'O-Level', 'SSC (Vocational)']
    },
    {
      level: 'Higher Secondary (HSC)',
      degrees: ['HSC', 'Alim', 'A-Level', 'HSC (Vocational)', 'Diploma in Engineering']
    },
    {
      level: 'Bachelor/Honors',
      degrees: ['B.Sc', 'BSS', 'BBA', 'BA', 'B.Com', 'MBBS']
    },
    {
      level: 'Masters',
      degrees: ['M.Sc', 'MSS', 'MBA', 'MA', 'M.Com']
    },
    {
      level: 'Doctoral',
      degrees: ['PhD', 'DBA']
    }
  ];

  for (const item of educationHierarchy) {
    const level = await prisma.levelOfEducation.upsert({
      where: { levelName: item.level },
      update: {},
      create: { levelName: item.level },
    });

    for (const dName of item.degrees) {
      await prisma.degree.create({
        data: {
          degreeName: dName,
          levelId: level.id
        }
      });
    }
  }

  console.log("Seeding completed successfully!");

  console.log("🌱 Seeding Religions...");

  const religions = [
    'Islam',
    'Hinduism',
    'Christianity',
    'Buddhism',
    'Judaism',
    'Sikhism',
    'Atheist',
    'Other'
  ];

  for (const religion of religions) {
    await prisma.religion.upsert({
      where: { name: religion },
      update: {},
      create: { name: religion },
    });
  }

  console.log("✅ Religions Seeded");


  console.log("🌱 Seeding Blood Groups...");

  const bloodGroups = [
    'A(+ve)', 'A(-ve)',
    'B(+ve)', 'B(-ve)',
    'AB(+ve)', 'AB(-ve)',
    'O(+ve)', 'O(-ve)'
  ];

  for (const group of bloodGroups) {
    await prisma.bloodGroup.upsert({
      where: { name: group },
      update: {},
      create: { name: group },
    });
  }

  console.log("✅ Blood Groups Seeded");


  console.log("🌱 Seeding Skills...");

  const skills = [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express.js',
    'Next.js',
    'React',
    'MongoDB',
    'PostgreSQL',
    'Prisma',
    'REST API',
    'JWT Authentication',
    'Docker',
    'AWS',
    'Git',
    'GitHub'
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { skillName: skill },
      update: {},
      create: { skillName: skill },
    });
  }

  console.log("✅ Skills Seeded");


  console.log("🌱 Seeding Interests...");

  const interests = [
    'Programming',
    'Web Development',
    'Software Engineering',
    'Open Source',
    'Problem Solving',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Cyber Security',
    'Cloud Computing',
    'Reading Tech Blogs',
    'Learning New Technologies',
    'Startup & Entrepreneurship',
    'Freelancing',
    'Teaching & Mentoring'
  ];

  for (const interest of interests) {
    await prisma.interst.upsert({
      where: { interstName: interest },
      update: {},
      create: { interstName: interest },
    });
  }

  console.log("✅ Interests Seeded");
   console.log("✅ All seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
