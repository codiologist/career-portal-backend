import { PrismaClient, AddressTypeEnum } from '@prisma/client';
import {
  SSC_DEGREE_OPTIONS,
  HSC_DEGREE_OPTIONS,
  DIPLOMA_DEGREE_OPTIONS,
  BACHELOR_DEGREE_OPTIONS,
  POSTGRADUATE_DEGREE_OPTIONS,
} from '../src/utils/constant/degreeConstant';
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
    { name: 'First Division/Class', serialNo: 1 },
    { name: 'Second Division/Class', serialNo: 2 },
    { name: 'Third Division/Class', serialNo: 3 },
    { name: 'Grade', serialNo: 4 },
    { name: 'Appeared', serialNo: 5 },
    { name: 'Pass', serialNo: 6 },
  ];

  for (const type of resultTypes) {
    await prisma.resultType.upsert({
      where: { resultType: type.name, orderBy: type.serialNo },
      update: {},
      create: { resultType: type.name, orderBy: type.serialNo },
    });
  }

  // 2. Education Boards (Bangladesh)
  const boards = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Jessore',
    'Barisal',
    'Sylhet',
    'Comilla',
    'Dinajpur',
    'Mymensingh',
    'Madrasah',
    'Technical',
  ];

  for (const board of boards) {
    await prisma.educationBoard.upsert({
      where: { boardName: board },
      update: {},
      create: { boardName: board },
    });
  }

  // 3. Major Groups (SSC/HSC level)
  const groups = [
    { groupName: 'Science', orderBy: 1 },
    { groupName: 'Commerce', orderBy: 2 },
    { groupName: 'Arts/Humanities', orderBy: 3 },
    { groupName: 'General', orderBy: 4 },
    { groupName: 'Vocational', orderBy: 5 },
  ];
  for (const group of groups) {
    await prisma.majorGroup.upsert({
      where: { groupName: group.groupName, orderBy: group.orderBy },
      update: {},
      create: { groupName: group.groupName, orderBy: group.orderBy },
    });
  }

  // 4. Subjects (Commonly used in BD Universities/Colleges)
  const subjects = [
    'Computer Science & Engineering',
    'Electrical & Electronic Engineering',
    'BBA',
    'Accounting',
    'English',
    'Economics',
    'Physics',
    'Mathematics',
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
      level: 'Secondary',
      degrees: SSC_DEGREE_OPTIONS,
    },
    {
      level: 'Higher Secondary',
      degrees: HSC_DEGREE_OPTIONS,
    },
    {
      level: 'Diploma',
      degrees: DIPLOMA_DEGREE_OPTIONS,
    },
    {
      level: 'Bachelor/Honors',
      degrees: BACHELOR_DEGREE_OPTIONS,
    },
    {
      level: 'Postgraduate',
      degrees: POSTGRADUATE_DEGREE_OPTIONS,
    },
    {
      level: 'PhD',
      degrees: [],
    },
  ];

  for (const [index, item] of educationHierarchy.entries()) {
    const level = await prisma.levelOfEducation.upsert({
      where: { levelName: item.level },
      update: {},
      create: { levelName: item.level, orderBy: index + 1 },
    });

    for (const dName of item.degrees) {
      await prisma.degree.create({
        data: {
          degreeName: dName,
          levelId: level.id,
        },
      });
    }
  }

  console.log('Seeding completed successfully!');

  console.log('🌱 Seeding Religions...');

  const religions = [
    'Islam',
    'Hinduism',
    'Christianity',
    'Buddhism',
    'Judaism',
    'Sikhism',
    'Atheist',
    'Other',
  ];

  for (const religion of religions) {
    await prisma.religion.upsert({
      where: { name: religion },
      update: {},
      create: { name: religion },
    });
  }

  console.log('✅ Religions Seeded');

  console.log('🌱 Seeding Blood Groups...');

  const bloodGroups = [
    'A(+ve)',
    'A(-ve)',
    'B(+ve)',
    'B(-ve)',
    'AB(+ve)',
    'AB(-ve)',
    'O(+ve)',
    'O(-ve)',
  ];

  for (const group of bloodGroups) {
    await prisma.bloodGroup.upsert({
      where: { name: group },
      update: {},
      create: { name: group },
    });
  }

  console.log('✅ Blood Groups Seeded');

  console.log('🌱 Seeding Skills...');

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
    'GitHub',
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { skillName: skill },
      update: {},
      create: { skillName: skill },
    });
  }

  console.log('✅ Skills Seeded');

  console.log('🌱 Seeding Interests...');

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
    'Teaching & Mentoring',
  ];

  for (const interest of interests) {
    await prisma.interst.upsert({
      where: { interstName: interest },
      update: {},
      create: { interstName: interest },
    });
  }

  console.log('✅ Interests Seeded');
  console.log('✅ All seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
