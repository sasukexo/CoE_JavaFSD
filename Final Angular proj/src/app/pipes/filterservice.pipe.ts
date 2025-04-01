import { Pipe, PipeTransform } from '@angular/core';
import { enquiry } from '../model/enquiry';

@Pipe({
  name: 'filterservice',
  pure: false // Ensures dynamic updates when data changes
})
export class FilterservicePipe implements PipeTransform {

  transform(enquirylist: enquiry[] | null, serviceType: string): enquiry[] {
    if (!enquirylist || !serviceType || serviceType.toLowerCase() === 'all') {
      return enquirylist || [];  // Ensure it doesn't return null
    }

    return enquirylist.filter(enquiry => enquiry.serviceType === serviceType);
  }
}
