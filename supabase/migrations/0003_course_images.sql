-- 0003_course_images.sql
-- Stock course images (Pexels, free to use) for the 25 catalogue-only
-- courses that previously had image = null, plus refreshed images for
-- PenTest+ and Hardware & Networking (which reused the CEH photo).
-- Semantically identical to src/data/courses.ts. Apply BEFORE redeploy:
-- the production build reads course images from Supabase.
-- Image files live in public/images/courses/ in the repo.

update public.courses set image = '/images/courses/azure-security-engineer-az-500.jpg' where slug = 'azure-security-engineer-az-500';
update public.courses set image = '/images/courses/microsoft-devops-az-400.jpg' where slug = 'microsoft-devops-az-400';
update public.courses set image = '/images/courses/sc-900.jpg' where slug = 'sc-900';
update public.courses set image = '/images/courses/sc-200.jpg' where slug = 'sc-200';
update public.courses set image = '/images/courses/microsoft-sentinel.jpg' where slug = 'microsoft-sentinel';
update public.courses set image = '/images/courses/aws-cloud-practitioner.jpg' where slug = 'aws-cloud-practitioner';
update public.courses set image = '/images/courses/aws-solutions-architect-associate.jpg' where slug = 'aws-solutions-architect-associate';
update public.courses set image = '/images/courses/aws-devops-engineer.jpg' where slug = 'aws-devops-engineer';
update public.courses set image = '/images/courses/comptia-a-plus-core-1.jpg' where slug = 'comptia-a-plus-core-1';
update public.courses set image = '/images/courses/comptia-a-plus-core-2.jpg' where slug = 'comptia-a-plus-core-2';
update public.courses set image = '/images/courses/cybersecurity-technologies.jpg' where slug = 'cybersecurity-technologies';
update public.courses set image = '/images/courses/vapt.jpg' where slug = 'vapt';
update public.courses set image = '/images/courses/core-java.jpg' where slug = 'core-java';
update public.courses set image = '/images/courses/java-full-stack.jpg' where slug = 'java-full-stack';
update public.courses set image = '/images/courses/power-bi.jpg' where slug = 'power-bi';
update public.courses set image = '/images/courses/mysql.jpg' where slug = 'mysql';
update public.courses set image = '/images/courses/data-analytics.jpg' where slug = 'data-analytics';
update public.courses set image = '/images/courses/data-science.jpg' where slug = 'data-science';
update public.courses set image = '/images/courses/certified-professional-coder-cpc.jpg' where slug = 'certified-professional-coder-cpc';
update public.courses set image = '/images/courses/hcc-medical-coding.jpg' where slug = 'hcc-medical-coding';
update public.courses set image = '/images/courses/ip-drg-medical-coding.jpg' where slug = 'ip-drg-medical-coding';
update public.courses set image = '/images/courses/em-medical-coding.jpg' where slug = 'em-medical-coding';
update public.courses set image = '/images/courses/radiology-medical-coding.jpg' where slug = 'radiology-medical-coding';
update public.courses set image = '/images/courses/anesthesia-medical-coding.jpg' where slug = 'anesthesia-medical-coding';
update public.courses set image = '/images/courses/autocad.jpg' where slug = 'autocad';
update public.courses set image = '/images/courses/pentest-plus.jpg' where slug = 'comptia-pentest-plus';
update public.courses set image = '/images/courses/hardware-networking.jpg' where slug = 'computer-hardware-and-networking';
