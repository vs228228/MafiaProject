using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.interfaces
{
    public interface IMapper
    {
        Task<TDestination> Map<TSource, TDestination>(TSource source);
        Task<TDestination> Update<TSource, TDestination>(TSource source, TDestination destination);
    }
}
