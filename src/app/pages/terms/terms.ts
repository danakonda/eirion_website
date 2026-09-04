import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { LanguageService } from '../../i18n/language.service';

type Seg = string | { t: string; href: string };

interface TermsSection {
  id: string;
  num: string;
  title: string;
  paras: Seg[][];
}

const PS = { t: 'Privacy Statement', href: '#privacy-statement' };

@Component({
  selector: 'app-terms',
  imports: [Icon, Reveal, RouterLink],
  templateUrl:'./terms.html' ,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terms implements OnInit {
  private readonly title = inject(Title);
  private readonly i18n = inject(LanguageService);

  protected readonly toc = [
    { num: '01', label: 'Definitions', id: '1-definitions-1' },
    { num: '02', label: 'Acceptance of Terms', id: '2-acceptance-of-terms-2' },
    { num: '03', label: 'Description of the Services', id: '3-description-of-the-services-3' },
    { num: '04', label: 'Prohibited Practices', id: '4-prohibited-practices-4' },
    { num: '05', label: 'Risks and Considerations Regarding EI Services', id: '5-risks-and-considerations-regarding-ei-services-5' },
    { num: '06', label: 'Third Party Content and Program Disclaimer.', id: '6-third-party-content-and-program-disclaimer-6' },
    { num: '07', label: 'User Representations', id: '7-user-representations-7' },
    {
      num: '07',
      label: 'Account Creation, Customer Account, Password, and Security Obligations',
      id: '7-account-creation-customer-account-password-and-security-obligations-8',
    },
    { num: '08', label: 'EI Privacy Statement and Disclosure of Information', id: 'privacy-statement' },
    { num: '09', label: 'Indemnity', id: '9-indemnity-10' },
    { num: '10', label: 'No Resale of Service', id: '10-no-resale-of-service-11' },
    { num: '11', label: 'General Practices Regarding Use and Storage', id: '11-general-practices-regarding-use-and-storage-12' },
    { num: '12', label: 'Modifications to Service', id: '12-modifications-to-service-13' },
    { num: '13', label: 'Termination', id: '13-termination-14' },
    { num: '14', label: 'Survival of Terms', id: '14-survival-of-terms-15' },
    {
      num: '15',
      label: 'Dealings with Information Providers and Listed Resources',
      id: '15-dealings-with-information-providers-and-listed-resources-16',
    },
    { num: '16', label: "EI's Proprietary Rights", id: '16-ei-s-proprietary-rights-17' },
    { num: '17', label: 'Limitation of Liability', id: '17-limitation-of-liability-18' },
    { num: '18', label: 'Notice', id: '18-notice-19' },
    { num: '19', label: 'Changes to the Terms of Service', id: '19-changes-to-the-terms-of-service-20' },
    {
      num: '20',
      label: 'Violation or Suspected Violation of Terms of Service',
      id: '20-violation-or-suspected-violation-of-terms-of-service-21',
    },
  ];

  protected readonly sections: TermsSection[] = [
    {
      id: '1-definitions-1',
      num: '01',
      title: 'Definitions',
      paras: [
        ['"EI" means Eirion Incorporated.'],
        [
          '"Product Development" means research and development activities performed by EI on its products. These activities may include, among other things, improving our Services and/or offering new products or services to you; performing quality control activities; conducting data analysis that may lead to and/or include commercialization with a third party.',
        ],
        [
          '"Service" or "Services means EI\'s products, software, services, and website (including but not limited to text, graphics, images, and other material and information) as accessed from time to time by the user, regardless if the use is in connection with an account or not.',
        ],
        [
          '"Personal Information" is information that can be used to identify you, either alone or in combination with other information, or that discloses protected health information about you. EI collects and stores the following types of Personal Information:',
        ],
        [
          '"Genetic Information" consists of your genotype, e.g. the As, Ts, Cs, and Gs at particular locations in your genome. Genetic Information is generated when you purchase genetic testing services and your saliva sample is analyzed and processed or you otherwise contribute or access your Genetic Information through our Services.',
        ],
        [
          '\u201cProtected Health Information\u201d consists of information, including Self-Reported Information and Genetic Information, to which you are entitled to protection under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) or other laws.',
        ],
        [
          '"Registration Information" is information that we collect from you when you purchase or sign up for our Services. Examples of such information include your name, credit card information, billing and shipping addresses, and contact information, such as email address and telephone number.',
        ],
        [
          '"Self-Reported Information" includes information you provide to us, including but not limited to information about your disease conditions (e.g. Type 2 Diabetes), your medications, other health-related information (e.g. pulse rate, cholesterol levels, visual acuity), personal traits (e.g., eye color, age, height, weight, gender), ethnicity, and/or family history (e.g. similar information about family members). We collect this information from you if and when you enter the information into surveys, forms, or features while signed in to your account.',
        ],
        [
          '"Web Usage Information" is information on how you use the EI website (e.g. browser type, domains, page views of EI sites) collected through log files.',
        ],
        [
          '"Aggregated Self-Reported Information" is Self-Reported Information that has been stripped of Registration Information and combined with data from a number of other users sufficient to minimize the possibility of exposing individual-level information.',
        ],
      ],
    },
    {
      id: '2-acceptance-of-terms-2',
      num: '02',
      title: 'Acceptance of Terms',
      paras: [
        [
          'Your use of EI\'s Services is subject to the terms of the legal agreement between you and EI set forth in these Terms of Service ("TOS"). Except as specified herein, these TOS apply to any use of the Services, including but not limited to interacting with the EI website, and/or creating and using your EI account. In order to use the Services, you must first agree to the TOS. You may not use the Services if you do not accept the TOS. You can accept the TOS by (1) clicking to accept or agree to the TOS, where this option is made available to you by EI for any Service; or by (2) actually using the Services. In this case, you acknowledge and agree that EI will treat your use of the Services as acceptance of the TOS from that point onwards. In addition, when using particular EI Services, you shall be subject to any guidelines or rules applicable to such services that may be posted from time to time. All such guidelines or rules are hereby incorporated by reference into the TOS. EI also may offer other services from time to time that are governed by different terms of service.',
        ],
      ],
    },
    {
      id: '3-description-of-the-services-3',
      num: '03',
      title: 'Description of the Services',
      paras: [
        [
          'The Services include access to the EI public website. Unless explicitly stated otherwise, each new feature that augments or enhances the current Service shall be subject to the TOS. We provide the Service "as-is," "with all faults" and "as available." We do not guarantee the accuracy or timeliness of information available from the Service. We give no express warranties, guarantees or conditions. You may have additional consumer rights under your local laws that this Service Agreement cannot change. We exclude any implied warranties including those of merchantability, fitness for a particular purpose, workmanlike effort and non-infringement. You acknowledge and agree that the form and nature of the Services which EI provides may change from time to time without prior notice to you. As part of this continuing innovation, you acknowledge and agree that EI may stop (permanently or temporarily) providing some Services (or any features within the Services) to you or to users generally at EI\'s sole discretion, without prior notice to you. You may stop using the Services at any time. You do not need to specifically inform EI when you stop using the Services unless you are requesting closure of your account. EI assumes no responsibility for the use of Services outside the terms of this TOS or other applicable terms.',
        ],
        [
          'In order to use the Services, you must obtain Internet access, either directly or through devices that access web-based content, and pay any service fees associated with such access. You are solely responsible for paying such fees. In addition, you must provide all equipment necessary to make such Internet connection, including a computer and modem or other access device. You are solely responsible for providing such equipment. You acknowledge and agree that while EI may not currently have set a fixed upper limit on the number of transmissions you may send or receive through the Services or on the amount of storage space used for the provision of any Service, such fixed upper limits may be set by EI at any time, at EI\'s discretion.',
        ],
      ],
    },
    {
      id: '4-prohibited-practices-4',
      num: '04',
      title: 'Prohibited Practices',
      paras: [
        ['In using the Service, you may not:'],
        [
          'use the Service in a way that harms us or our affiliates, resellers, distributors, and/or vendors (collectively, the "EI parties"), or any customer of a EI party;',
        ],
        [
          'use any automated process or service (such as a BOT, a spider, periodic caching of information stored by EI, or "meta-searching") to access and/or use the Service;',
        ],
        ['use any unauthorized means to modify or reroute, or attempt to modify or reroute, the Service;'],
        [
          "damage, disable, overburden, or impair the Service (or the network(s) connected to the Service) or interfere with anyone's use and enjoyment of the Service; or",
        ],
        ['resell or redistribute the Service, or any part of the Service.'],
        [
          'You acknowledge and agree that you are solely responsible for (and that EI has no responsibility to you or to any third party for) any breach of your obligations under the TOS and for the consequences (including any loss or damage which EI may suffer) of any such breach. In case of breach of the TOS EI has the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof) and you will defend and indemnify EI and its affiliates against any liability, costs, or damages arising out of the breach of the representation.',
        ],
        [
          'If you violate the terms of this Section and/or EI has a reasonable ground to suspect that you have violated the terms of this Section, EI has the right to suspend or terminate your account and refuse any and all current or future use of the Service (or any portion thereof).',
        ],
      ],
    },
    {
      id: '5-risks-and-considerations-regarding-ei-services-5',
      num: '05',
      title: 'Risks and Considerations Regarding EI Services',
      paras: [
        [
          'We do not provide medical advice. The Genetic Information provided by or through EI is to provide information to medical professionals to treat their patients. The Services are not a substitute for professional medical advice. You should always seek the advice of your physician or other health care provider with any questions you may have regarding diagnosis, cure, treatment, mitigation, or prevention of any disease or other medical condition or impairment or the status of your health.',
        ],
        [
          'We provide a tool to physicians giving you care. EI does not recommend or endorse any specific course of action, resources, tests, physician or other health care providers, drugs, biologics, medical devices or other products, procedures, opinions, or other information that may be mentioned on our website. EI believes that (a) genetics is only part of the picture of any individual\'s state of being, (b) the state of the understanding of Genetic Information is rapidly evolving and at any given time we only comprehend part of the picture of the role of genetics, and (c) only a trained physician or other health care provider can assess your current state of health or disease, taking into account many factors, including in some cases your genetics as well as your current symptoms, if any.',
        ],
      ],
    },
    {
      id: '6-third-party-content-and-program-disclaimer-6',
      num: '06',
      title: 'Third Party Content and Program Disclaimer.',
      paras: [
        [
          'The Service provides, and third parties may provide, links to other sites and resources on the Internet. Programs and devices that connect with the EI Website are not endorsed or warranted by EI. Product descriptions are by their manufacturers and provided for informational purposes only. We do not operate, control or supply any information, product, or service that is not clearly identified as supplied by EI. Because EI has no control over such sites and resources, you acknowledge and agree that EI is not responsible for the availability of such external sites or resources, and does not endorse and is not responsible or liable for any content, advertising, products, or other materials on or available from such sites or resources. You further acknowledge and agree that EI shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such hyperlinked site or resource.',
        ],
        [
          'Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition, diet, fitness or wellness program \u2013 or any treatment decision. Never disregard professional medical advice or delay in seeking it because of information you accessed on or through the Service.',
        ],
      ],
    },
    {
      id: '7-user-representations-7',
      num: '07',
      title: 'User Representations',
      paras: [
        ['By accessing EI Services, you agree to, acknowledge, and represent as follows:'],
        [
          'You understand that information you learn from or through EI is designed for a medical professional to use in context with other medical data and their professional judgment. You acknowledge that EI urges you to seek the advice of your physician or other health care provider if you have questions or concerns arising from information obtained from or through the site.',
        ],
        [
          'You are warranting that you are not an insurance company or an employer attempting to obtain information about an insured person or an employee for any illegal purpose.',
        ],
        [
          'You take responsibility for all possible consequences resulting from your sharing with others access to your Genetic Information and your Self-Reported Information.',
        ],
        [
          'You understand that all your Personal Information will be stored in EI databases and will be processed in accordance with the EI ',
          PS,
          '.',
        ],
        [
          'You agree that you have the authority, under the laws of the state or jurisdiction in which you reside, to provide these representations. In case of breach of any one of these representations EI has the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof) and you will defend and indemnify EI and its affiliates against any liability, costs, or damages arising out of the breach of the representation.',
        ],
      ],
    },
    {
      id: '7-account-creation-customer-account-password-and-security-obligations-8',
      num: '07',
      title: 'Account Creation, Customer Account, Password, and Security Obligations',
      paras: [
        [
          'In consideration of your use of the Services, you agree to: (a) provide true, accurate, current, and complete Registration Information about yourself as prompted by the Service; and (b) maintain and promptly update the Registration Information to keep it true, accurate, current, and complete. If you provide any Registration Information that is untrue, inaccurate, not current, or incomplete, or if EI has a reasonable ground to suspect that such information is untrue, inaccurate, not current, or incomplete, EI has the right to suspend or terminate your account and refuse any and all current or future use of the Service (or any portion thereof).',
        ],
        [
          'After you have purchased our Service, you will create a password and account designation. You are responsible for maintaining the confidentiality of the password and account, and are fully responsible for all activities that occur under your password or account. If you allow third parties to access EI\'s website through your username and password, you will defend and indemnify EI and its affiliates against any liability, costs, or damages, including attorney fees, arising out of claims or suits by such third parties based upon or relating to such access and use. You agree to (a) immediately notify EI of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session. EI cannot and will not be liable for any loss or damage arising from your failure to comply with this Section.',
        ],
      ],
    },
    {
      id: 'privacy-statement',
      num: '08',
      title: 'EI Privacy Statement and Disclosure of Information',
      paras: [
        [
          'In order to use the Services, you must first acknowledge and agree to the ',
          PS,
          '. You may not use the Services if you do not accept the ',
          PS,
          '. You can acknowledge and agree to the ',
          PS,
          ' by (1) clicking to accept or agree to the ',
          PS,
          ', where this option is made available to you by EI for any Service; or by (2) actually using the Services.',
        ],
        [
          'You acknowledge and agree that EI has the right to monitor any use of its systems by its personnel at any time and maintain copies documenting such monitoring. Our ',
          PS,
          ' sets forth the only expectations of privacy any individual should have in terms of usage of the EI Services, website, or other systems.',
        ],
        [
          'Please refer to our ',
          PS,
          ' to read about data protection related to your information. See our complete ',
          PS,
          ' here.',
        ],
      ],
    },
    {
      id: '9-indemnity-10',
      num: '09',
      title: 'Indemnity',
      paras: [
        [
          "You agree to defend and hold EI, and its subsidiaries, affiliates, officers, agents, contractors, partners, employees, successors, and assigns harmless from any claim, or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Service; your connection to the Service; your violation of the TOS; or your violation of any rights of another.",
        ],
      ],
    },
    {
      id: '10-no-resale-of-service-11',
      num: '10',
      title: 'No Resale of Service',
      paras: [
        [
          'You agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer, or transmit for any commercial purposes, all or any portion of the Service, use of the Service, or access to the Service.',
        ],
      ],
    },
    {
      id: '11-general-practices-regarding-use-and-storage-12',
      num: '11',
      title: 'General Practices Regarding Use and Storage',
      paras: [
        [
          "You acknowledge that EI may establish general practices and limits concerning use of the Services, including without limitation the maximum number of days that Personal Information and Services content will be retained by the Service, the maximum disk space that will be allotted on EI's servers on your behalf, and the maximum number of times (and the maximum duration for which) you may access the Services in a given period of time. You acknowledge and agree that EI has no responsibility or liability for the deletion of or failure to store any messages, other communications, or other content maintained or transmitted by the Services; or for the loss of Genetic Information due to malfunction or destruction of data servers or other catastrophic events. You further acknowledge that EI reserves the right to change these general practices and limits in its sole discretion.",
        ],
      ],
    },
    {
      id: '12-modifications-to-service-13',
      num: '12',
      title: 'Modifications to Service',
      paras: [
        [
          'EI reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Services (or any part thereof) with or without notice. You acknowledge and agree that EI shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Services.',
        ],
        [
          'The Software that you use may from time to time automatically download and install updates from EI. These updates are designed to improve, enhance, and further develop the Services and may take the form of bug fixes, enhanced functions, new software modules, and completely new versions. You agree to receive such updates (and permit EI to deliver these to you) as part of your use of the Services.',
        ],
      ],
    },
    {
      id: '13-termination-14',
      num: '13',
      title: 'Termination',
      paras: [
        ['The TOS will continue to apply until terminated by either you or EI as set out in this Section.'],
        [
          'If you want to terminate your legal agreement with EI, you may do so by notifying EI at any time in writing, which will entail closing your accounts for all of the Services that you use. Your notice should be sent, in writing, to EI\'s address, which is set out at the beginning of the TOS.',
        ],
        [
          "EI may at any time, terminate its legal agreement with you (and in conjunction therewith, your password and account(s)) if: (1) you have breached any provision of the TOS (or have acted in manner which shows that you do not intend to, or are unable to comply with, the provisions of the TOS); (2) EI is required to do so by law (for example, where the provision of the Services to you is, or becomes, unlawful); (3) the partner with whom EI offered the Services to you has terminated its relationship with EI or ceased to offer the Services to you; (4) EI is transitioning to no longer providing the Services to users in the country or state in which you reside or from which you use the Services; or (5) the provision of the Services to you by EI is, in EI's opinion, no longer commercially viable.",
        ],
        [
          'Any suspected fraudulent, abusive, or illegal activity that may be grounds for termination of your use of the Services may be referred to appropriate law enforcement authorities. You acknowledge and agree that EI shall not be liable to you or any third party for any termination of your access to the Services.',
        ],
      ],
    },
    {
      id: '14-survival-of-terms-15',
      num: '14',
      title: 'Survival of Terms',
      paras: [
        [
          'When the TOS come to an end, all of the legal rights, obligations, and liabilities that you and EI have benefited from, been subject to (or which have accrued over time while the TOS have been in force) or which are expressed to continue indefinitely, shall be unaffected by this cessation, and such provisions shall continue to apply to such rights, obligations, and liabilities indefinitely.',
        ],
      ],
    },
    {
      id: '15-dealings-with-information-providers-and-listed-resources-16',
      num: '15',
      title: 'Dealings with Information Providers and Listed Resources',
      paras: [
        [
          'Your correspondence or business dealings with \u2013 or participation in promotions of \u2013 information providers, vendors, and/or resources found on or through the Service, including payment and delivery of related goods or services, and any other terms, conditions, warranties, or representations associated with such dealings, are solely between you and such information provider or resource. You acknowledge and agree that EI shall not be responsible or liable for any loss or damage of any sort incurred as the result of any such dealings or as the result of the presence of such information provider or resources on the Service.',
        ],
      ],
    },
    {
      id: '16-ei-s-proprietary-rights-17',
      num: '16',
      title: "EI's Proprietary Rights",
      paras: [
        [
          'You acknowledge and agree that EI (or EI\'s licensors, as applicable) own all legal right, title, and interest in and to the Services, including any intellectual property rights which subsist in the Services (whether those rights happen to be registered or not, and wherever in the world those rights may exist). You further acknowledge that the Services may contain information which is designated confidential by EI and that you shall not disclose such information without EI\'s prior written consent.',
        ],
        [
          'You further acknowledge and agree that the Services and any necessary software used in connection with the Services ("Software") contain proprietary and confidential information that is protected by applicable intellectual property and other laws. You further acknowledge and agree that information presented to you through the Services or sponsors is protected by copyrights, trademarks, service marks, patents, or other proprietary rights and laws. Except as expressly authorized by EI, you agree not to \u2013 and not to permit anyone else to \u2013 modify, rent, lease, loan, sell, distribute, or create derivative works of, reverse engineer, decompile, or otherwise attempt to extract the source code of the Services or Software or any part thereof, in whole or in part. Software, if any, that is made available to download from the Services, excluding software that may be made available by end-users through the Services, is the copyrighted work of EI and/or its suppliers. Your use of the Software is governed by the terms of the end user license agreement, if any, which accompanies or is included with the Software ("License Agreement"). You may not install or use any Software that is accompanied by or includes a License Agreement unless you first agree to the License Agreement terms.',
        ],
        [
          'Eirion Incorporated, EI, and other EI logos and product and service names are trademarks of EI and these marks together with any other EI trade names, service marks, logos, domain names, and other distinctive brand features are the "EI Marks". Nothing in the TOS gives you a right to use any EI Marks and you agree not to display, or use in any manner, EI Marks.',
        ],
      ],
    },
    {
      id: '17-limitation-of-liability-18',
      num: '17',
      title: 'Limitation of Liability',
      paras: [
        [
          'WITHIN THE LIMITS ALLOWED BY APPLICABLE LAWS, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT EI\u2019S MAXIMUM LIABILITY TO YOU SHALL BE FEES PAID FOR THE EI SERVICE AND THAT EI SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF EI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM: (a) THE USE OR THE INABILITY TO USE THE SERVICES; (b) ANY ACTION YOU TAKE BASED ON THE INFORMATION YOU RECEIVE IN THROUGH OR FROM THE SERVICES, (v) YOUR FAILURE TO KEEP YOUR PASSWORD OR ACCOUNT DETAILS SECURE AND CONFIDENTIAL, (d) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION, OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICES; (e) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (f) THE IMPROPER AUTHORIZATION FOR THE SERVICES BY SOMEONE CLAIMING SUCH AUTHORITY; or (g) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICES.',
        ],
      ],
    },
    {
      id: '18-notice-19',
      num: '18',
      title: 'Notice',
      paras: [
        [
          'Notices to you may be made via either email or regular mail. EI may also provide notices of changes to the TOS or other matters by displaying notices or links to notices to you generally on or through the Services.',
        ],
        ["Official notices related to this TOS must be sent to us at: Eirion Incorporated"],
        ['ATTN:'],
        [{ t: 'support@eirion.ai', href: 'mailto:support@eirion.ai' }],
        [
          'Any notices that you provide without compliance with this section on Notices shall have no legal effect.',
        ],
      ],
    },
    {
      id: '19-changes-to-the-terms-of-service-20',
      num: '19',
      title: 'Changes to the Terms of Service',
      paras: [
        [
          'EI may make changes to the TOS from time to time. When these changes are made, EI will make a new copy of the TOS available on its website and any new additional terms will be made available to you from within, or through, the affected Services.',
        ],
        [
          'You acknowledge and agree that if you use the Services after the date on which the TOS have changed, EI will treat your use as acceptance of the updated TOS.',
        ],
      ],
    },
    {
      id: '20-violation-or-suspected-violation-of-terms-of-service-21',
      num: '20',
      title: 'Violation or Suspected Violation of Terms of Service',
      paras: [
        [
          'If you violate the terms of these TOS and/or EI has a reasonable ground to suspect that you have violated the terms of these TOS, EI has the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).',
        ],
      ],
    },
  ];

  ngOnInit(): void {
    this.title.setTitle(this.i18n.t('meta.title.terms'));
  }

  protected isLink(seg: Seg): seg is { t: string; href: string } {
    return typeof seg !== 'string';
  }
}
